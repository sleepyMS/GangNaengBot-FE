import { create } from "zustand";
import type { MessageItem, SessionItem } from "@/types";
import { sessionsService, chatService } from "@/api";

interface ChatState {
  // State
  sessions: SessionItem[];
  currentSessionId: string | null;
  guestUserId: number | null; // 게스트 모드에서 사용할 임시 user_id
  messages: MessageItem[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;

  // Actions
  fetchSessions: () => Promise<void>;
  createSession: () => Promise<string>;
  selectSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  addMessage: (message: MessageItem) => void;
  clearCurrentSession: () => void;
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial State - 목업 데이터 포함
  sessions: [
    {
      sid: "mock-session-1",
      title: "강남대 컴퓨터공학과 졸업요건 문의",
      is_active: true,
      created_at: "2024-12-09T14:30:00Z",
    },
    {
      sid: "mock-session-2",
      title: "2024학년도 2학기 수강신청 일정",
      is_active: true,
      created_at: "2024-12-08T10:15:00Z",
    },
    {
      sid: "mock-session-3",
      title: "전공필수 과목 이수 순서 추천",
      is_active: true,
      created_at: "2024-12-07T16:45:00Z",
    },
    {
      sid: "mock-session-4",
      title: "복수전공 신청 절차 안내",
      is_active: false,
      created_at: "2024-12-05T09:20:00Z",
    },
    {
      sid: "mock-session-5",
      title: "장학금 신청 방법과 기한",
      is_active: false,
      created_at: "2024-12-03T11:00:00Z",
    },
  ],
  currentSessionId: null,
  guestUserId: null, // 게스트 모드 임시 user_id
  messages: [],
  isLoading: false,
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
            : "세션 목록을 불러오지 못했습니다.",
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
            : "새 대화를 시작하지 못했습니다.",
      });
      throw error;
    }
  },

  selectSession: async (sessionId: string) => {
    set({ isLoading: true, error: null, currentSessionId: sessionId });

    // 목업 세션인 경우 목업 메시지 반환
    if (sessionId.startsWith("mock-")) {
      const mockMessages: Record<string, MessageItem[]> = {
        "mock-session-1": [
          {
            role: "user",
            content: "강남대 컴퓨터공학과 졸업요건이 어떻게 되나요?",
            created_at: "2024-12-09T14:30:00Z",
          },
          {
            role: "assistant",
            content:
              "안녕하세요! 강남대학교 컴퓨터공학과 졸업요건을 안내해 드릴게요.\n\n**졸업학점**: 총 130학점 이상\n\n**전공 이수학점**:\n- 전공필수: 24학점\n- 전공선택: 42학점 이상\n- 총 전공: 66학점 이상\n\n**교양 이수학점**:\n- 기초교양: 15학점\n- 균형교양: 12학점 이상\n- 총 교양: 27학점 이상\n\n**기타 요건**:\n- 졸업논문 또는 졸업시험 통과\n- 외국어 인증 (TOEIC 700점 이상 등)\n\n더 궁금한 점이 있으시면 물어봐 주세요! 😊",
            created_at: "2024-12-09T14:30:15Z",
          },
          {
            role: "user",
            content: "전공필수 과목 목록 알려줘",
            created_at: "2024-12-09T14:31:00Z",
          },
          {
            role: "assistant",
            content:
              "컴퓨터공학과 **전공필수 과목**은 다음과 같습니다:\n\n| 학년 | 과목명 | 학점 |\n|------|--------|------|\n| 1학년 | 프로그래밍기초 | 3 |\n| 1학년 | 이산수학 | 3 |\n| 2학년 | 자료구조 | 3 |\n| 2학년 | 컴퓨터구조 | 3 |\n| 2학년 | 알고리즘 | 3 |\n| 3학년 | 운영체제 | 3 |\n| 3학년 | 데이터베이스 | 3 |\n| 4학년 | 캡스톤디자인 | 3 |\n\n총 **24학점**을 이수해야 합니다. 과목별 선수과목 정보가 필요하시면 말씀해 주세요!",
            created_at: "2024-12-09T14:31:30Z",
          },
        ],
        "mock-session-2": [
          {
            role: "user",
            content: "2024학년도 2학기 수강신청 일정이 어떻게 되나요?",
            created_at: "2024-12-08T10:15:00Z",
          },
          {
            role: "assistant",
            content:
              "2024학년도 2학기 수강신청 일정을 안내해 드릴게요! 📅\n\n**수강신청 기간**:\n- 1차: 8월 19일(월) ~ 8월 21일(수)\n- 2차: 8월 26일(월) ~ 8월 28일(수)\n- 정정기간: 9월 2일(월) ~ 9월 6일(금)\n\n**수강신청 시간**:\n- 4학년: 10:00 ~\n- 3학년: 10:30 ~\n- 2학년: 11:00 ~\n- 1학년: 11:30 ~\n\n**주의사항**:\n- 최대 신청 가능 학점: 21학점\n- 직전 학기 성적 우수자(4.0 이상): 24학점까지 가능\n\n미리 시간표를 짜두시면 좋아요! 도움이 필요하시면 말씀해 주세요 😊",
            created_at: "2024-12-08T10:15:20Z",
          },
        ],
        "mock-session-3": [
          {
            role: "user",
            content: "전공필수 과목 이수 순서를 추천해줘",
            created_at: "2024-12-07T16:45:00Z",
          },
          {
            role: "assistant",
            content:
              "전공필수 과목의 **권장 이수 순서**를 안내해 드릴게요! 🎓\n\n```\n1학년 1학기: 프로그래밍기초\n    ↓\n1학년 2학기: 이산수학\n    ↓\n2학년 1학기: 자료구조\n    ↓\n2학년 2학기: 컴퓨터구조, 알고리즘\n    ↓\n3학년 1학기: 운영체제\n    ↓\n3학년 2학기: 데이터베이스\n    ↓\n4학년: 캡스톤디자인\n```\n\n**Tip**: \n- 자료구조는 알고리즘의 선수과목이에요\n- 컴퓨터구조는 운영체제 이해에 도움이 됩니다\n- 캡스톤디자인은 모든 전공지식을 활용하는 과목이므로 마지막에 수강하세요!\n\n학점 계획에 맞게 조절해도 좋아요 😊",
            created_at: "2024-12-07T16:45:30Z",
          },
        ],
        "mock-session-4": [
          {
            role: "user",
            content: "복수전공 신청은 어떻게 하나요?",
            created_at: "2024-12-05T09:20:00Z",
          },
          {
            role: "assistant",
            content:
              "복수전공 신청 절차를 안내해 드릴게요! 📚\n\n**신청 자격**:\n- 2학년 이상 재학생\n- 취득학점 35학점 이상\n- 평균평점 3.0 이상\n\n**신청 기간**: 매 학기 초 (3월, 9월)\n\n**신청 절차**:\n1. 학사포털 로그인\n2. 학적 > 복수/부전공 신청\n3. 희망 전공 선택 후 신청서 제출\n4. 해당 학과 승인 대기\n5. 승인 완료 후 복수전공 과목 수강 가능\n\n**이수 요건**:\n- 복수전공: 36학점 이상\n- 졸업 시 주전공, 복수전공 모두 학위 취득\n\n궁금한 점 있으시면 추가로 물어봐 주세요!",
            created_at: "2024-12-05T09:20:25Z",
          },
        ],
        "mock-session-5": [
          {
            role: "user",
            content: "장학금 신청 방법 알려주세요",
            created_at: "2024-12-03T11:00:00Z",
          },
          {
            role: "assistant",
            content:
              "장학금 신청 방법을 안내해 드릴게요! 💰\n\n**교내 장학금**:\n- 성적우수장학금: 자동 선발 (별도 신청 불필요)\n- 근로장학금: 학생처 홈페이지 신청\n- 복지장학금: 학생처 방문 또는 온라인 신청\n\n**국가장학금**:\n1. 한국장학재단 홈페이지 접속 (www.kosaf.go.kr)\n2. 국가장학금 신청 클릭\n3. 본인 인증 후 신청서 작성\n4. 가구원 동의 필수!\n5. 서류 제출 (필요시)\n\n**신청 기간**:\n- 1학기: 전년도 11월 ~ 당해 1월\n- 2학기: 5월 ~ 6월\n\n**Tip**: 신청 기간 놓치지 않도록 알림 설정해 두세요! 😊",
            created_at: "2024-12-03T11:00:30Z",
          },
        ],
      };

      set({
        messages: mockMessages[sessionId] || [],
        isLoading: false,
      });
      return;
    }

    try {
      const response = await sessionsService.getSessionMessages(sessionId);
      set({
        messages: response.messages,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "대화 내용을 불러오지 못했습니다.",
      });
    }
  },

  deleteSession: async (sessionId: string) => {
    try {
      await sessionsService.deleteSession(sessionId);
      set((state) => ({
        sessions: state.sessions.filter((s) => s.sid !== sessionId),
        currentSessionId:
          state.currentSessionId === sessionId ? null : state.currentSessionId,
        messages: state.currentSessionId === sessionId ? [] : state.messages,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "대화를 삭제하지 못했습니다.",
      });
    }
  },

  sendMessage: async (message: string) => {
    const { currentSessionId, guestUserId } = get();
    if (!currentSessionId) {
      set({ error: "세션이 선택되지 않았습니다." });
      return;
    }

    // 사용자 메시지 즉시 추가
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
      const response = await chatService.sendMessage({
        session_id: currentSessionId,
        message,
        user_id: guestUserId ?? undefined, // 게스트 모드면 guestUserId 사용
      });

      // AI 응답 추가
      const assistantMessage: MessageItem = {
        role: "assistant",
        content: response.text,
        created_at: new Date().toISOString(),
      };
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isSending: false,
      }));

      // 세션 제목 업데이트 (첫 메시지인 경우)
      if (get().messages.length <= 2) {
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
    } catch (error) {
      set({
        isSending: false,
        error:
          error instanceof Error
            ? error.message
            : "메시지 전송에 실패했습니다.",
      });
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
}));
