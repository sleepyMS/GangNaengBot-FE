import { create } from "zustand";
import type { MessageItem, SessionItem } from "@/types";
import { sessionsService, chatService } from "@/api";
import i18n from "@/i18n";

// 진행 중인 프리페치 요청을 추적하기 위한 Map (컴포넌트 외부에 선언)
const pendingPrefetches = new Map<string, Promise<MessageItem[]>>();

interface ChatState {
  // State
  sessions: SessionItem[];
  currentSessionId: string | null;
  guestUserId: number | null; // 게스트 모드에서 사용할 임시 user_id
  messages: MessageItem[];
  messageCache: Map<string, MessageItem[]>; // 세션별 메시지 캐시
  isLoading: boolean;
  isSending: boolean;
  error: string | null;

  // Actions
  fetchSessions: () => Promise<void>;
  createSession: () => Promise<string>;
  selectSession: (sessionId: string, forceRefresh?: boolean) => Promise<void>;
  prefetchSession: (sessionId: string) => void; // 호버 프리페칭용
  deleteSession: (sessionId: string) => Promise<void>;
  sendMessage: (
    message: string,
    createSessionIfNeeded?: boolean
  ) => Promise<void>;
  addMessage: (message: MessageItem) => void;
  clearCurrentSession: () => void;
  clearError: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial State
  sessions: [],
  currentSessionId: null,
  guestUserId: null, // 게스트 모드 임시 user_id
  messages: [],
  messageCache: new Map(), // 세션별 메시지 캐시
  isLoading: true, // 초기 로딩 시 스피너 표시
  isSending: false,
  error: null,

  // Actions
  fetchSessions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await sessionsService.listSessions();
      set({ sessions: response.sessions, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : i18n.t("store.error.sessionList"),
      });
    }
  },

  createSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await sessionsService.createSession();
      const newSession: SessionItem = {
        sid: response.session_id,
        title: response.title,
        is_active: true,
        created_at: response.created_at || new Date().toISOString(),
      };
      set((state) => ({
        sessions: [newSession, ...state.sessions],
        currentSessionId: response.session_id,
        guestUserId: response.user_id, // 세션 생성 시 user_id 저장 (게스트 모드용)
        messages: [],
        isLoading: false,
      }));
      return response.session_id;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : i18n.t("store.error.createSession"),
      });
      throw error;
    }
  },

  selectSession: async (sessionId: string, forceRefresh: boolean = false) => {
    const { messageCache } = get();
    const cachedMessages = messageCache.get(sessionId);

    // 캐시가 있으면 즉시 표시 (낙관적 UI)
    if (cachedMessages && !forceRefresh) {
      set({
        currentSessionId: sessionId,
        messages: cachedMessages,
        isLoading: false,
        error: null,
      });

      // 백그라운드에서 최신 데이터 가져오기 (조용히 업데이트)
      sessionsService
        .getSessionMessages(sessionId)
        .then((response) => {
          const newCache = new Map(get().messageCache);
          newCache.set(sessionId, response.messages);

          // 현재 세션이면 UI도 업데이트
          if (get().currentSessionId === sessionId) {
            set({ messages: response.messages, messageCache: newCache });
          } else {
            set({ messageCache: newCache });
          }
        })
        .catch(() => {
          // 백그라운드 에러는 무시 (캐시 데이터 사용 중)
        });
      return;
    }

    // 진행 중인 프리페치가 있으면 해당 요청을 재사용
    const pendingPrefetch = pendingPrefetches.get(sessionId);
    if (pendingPrefetch && !forceRefresh) {
      set({ isLoading: true, error: null, currentSessionId: sessionId });

      try {
        const messages = await pendingPrefetch;
        // 프리페치가 완료되면 캐시도 업데이트됨
        set({
          messages,
          isLoading: false,
        });
        return;
      } catch {
        // 프리페치 실패 시 아래에서 새로 요청
      }
    }

    // 캐시도 없고 프리페치도 없으면 로딩 표시 후 API 호출
    set({ isLoading: true, error: null, currentSessionId: sessionId });

    try {
      const response = await sessionsService.getSessionMessages(sessionId);
      const newCache = new Map(get().messageCache);
      newCache.set(sessionId, response.messages);

      set({
        messages: response.messages,
        messageCache: newCache,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : i18n.t("store.error.fetchMessages"),
      });
    }
  },

  // 호버 프리페칭: UI 상태 변경 없이 백그라운드에서 데이터 로드
  prefetchSession: (sessionId: string) => {
    const { messageCache } = get();

    // 이미 캐시가 있으면 프리페칭 불필요
    if (messageCache.has(sessionId)) {
      return;
    }

    // 이미 프리페치 진행 중이면 중복 요청 방지
    if (pendingPrefetches.has(sessionId)) {
      return;
    }

    // 백그라운드에서 조용히 데이터 로드
    const prefetchPromise = sessionsService
      .getSessionMessages(sessionId)
      .then((response) => {
        const newCache = new Map(get().messageCache);
        newCache.set(sessionId, response.messages);
        set({ messageCache: newCache });
        return response.messages;
      })
      .finally(() => {
        // 완료 후 pending에서 제거
        pendingPrefetches.delete(sessionId);
      });

    // pending에 저장
    pendingPrefetches.set(sessionId, prefetchPromise);
  },

  deleteSession: async (sessionId: string) => {
    const { sessions, currentSessionId, messages } = get();

    // 1. 낙관적 UI: 즉시 세션 삭제 (UI 먼저 업데이트)
    const deletedSession = sessions.find((s) => s.sid === sessionId);
    const wasCurrentSession = currentSessionId === sessionId;

    // 캐시도 삭제
    const newCache = new Map(get().messageCache);
    newCache.delete(sessionId);

    set({
      sessions: sessions.filter((s) => s.sid !== sessionId),
      currentSessionId: wasCurrentSession ? null : currentSessionId,
      messages: wasCurrentSession ? [] : messages,
      messageCache: newCache,
    });

    try {
      // 2. 백엔드 API 호출
      await sessionsService.deleteSession(sessionId);
    } catch (error) {
      // 3. 실패 시 롤백: 삭제 취소
      if (deletedSession) {
        set((state) => ({
          sessions: [deletedSession, ...state.sessions],
          currentSessionId: wasCurrentSession
            ? sessionId
            : state.currentSessionId,
          error:
            error instanceof Error
              ? error.message
              : i18n.t("store.error.deleteSession"),
        }));
      }
    }
  },

  sendMessage: async (
    message: string,
    createSessionIfNeeded: boolean = false
  ) => {
    let { currentSessionId, guestUserId } = get();

    // 세션이 없고, 새 세션 생성이 필요한 경우 (첫 메시지)
    const needsNewSession = !currentSessionId && createSessionIfNeeded;

    // 낙관적 UI: 사용자 메시지 즉시 표시
    const userMessage: MessageItem = {
      role: "user",
      content: message,
      created_at: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, userMessage],
      isSending: true,
      error: null,
    }));

    try {
      // 세션이 필요하면 먼저 생성 (낙관적이지만 메시지는 이미 보여주고 있음)
      if (needsNewSession) {
        const response = await sessionsService.createSession();
        currentSessionId = response.session_id;
        guestUserId = response.user_id;

        const newSession: SessionItem = {
          sid: response.session_id,
          // 첫 메시지로 제목 설정
          title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
          is_active: true,
          created_at: response.created_at || new Date().toISOString(),
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: response.session_id,
          guestUserId: response.user_id,
        }));
      }

      if (!currentSessionId) {
        set({
          error: i18n.t("store.error.sessionNotSelected"),
          isSending: false,
        });
        return;
      }

      const response = await chatService.sendMessage({
        session_id: currentSessionId,
        message,
        user_id: guestUserId ?? undefined,
      });

      // 빈 응답 재시도 로직 (최대 5번)
      let responseText = response.text;
      const MAX_RETRIES = 5;
      const RETRY_DELAY = 500; // ms

      for (
        let attempt = 1;
        attempt < MAX_RETRIES && !responseText?.trim();
        attempt++
      ) {
        // 재시도 전 대기
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

        const retryResponse = await chatService.sendMessage({
          session_id: currentSessionId,
          message,
          user_id: guestUserId ?? undefined,
        });
        responseText = retryResponse.text;
      }

      // 5번 다 실패하면 친절한 재질문 안내 메시지로 응답
      if (!responseText?.trim()) {
        responseText = i18n.t("store.error.emptyResponseFallback");
      }

      // AI 응답 추가
      const assistantMessage: MessageItem = {
        role: "assistant",
        content: responseText,
        created_at: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isSending: false,
      }));

      // 세션 제목 업데이트 (첫 메시지인 경우, 새 세션이 아닌 기존 세션일 때만)
      if (!needsNewSession && get().messages.length <= 2) {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.sid === currentSessionId
              ? {
                  ...s,
                  title:
                    message.slice(0, 50) + (message.length > 50 ? "..." : ""),
                }
              : s
          ),
        }));
      }

      // 캐시 업데이트 (현재 메시지 내역 저장)
      if (currentSessionId) {
        const newCache = new Map(get().messageCache);
        newCache.set(currentSessionId, get().messages);
        set({ messageCache: newCache });
      }
    } catch (error) {
      // 실패 시 낙관적 메시지 롤백
      set((state) => ({
        messages: needsNewSession ? [] : state.messages.slice(0, -1),
        isSending: false,
        error:
          error instanceof Error
            ? error.message
            : i18n.t("store.error.sendMessage"),
      }));
    }
  },

  addMessage: (message: MessageItem) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  clearCurrentSession: () => {
    set({ currentSessionId: null, messages: [] });
  },

  clearError: () => set({ error: null }),

  reset: () => {
    pendingPrefetches.clear();
    set({
      sessions: [],
      currentSessionId: null,
      guestUserId: null,
      messages: [],
      messageCache: new Map(),
      isLoading: true,
      isSending: false,
      error: null,
    });
  },
}));
