import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import {
  ChatInput,
  MessageList,
  WelcomeScreen,
  SuggestedQuestions,
} from "@/components/chat";
import { useChatStore, useUIStore } from "@/store";

export const ChatPage = () => {
  const { sessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();
  const { messages, currentSessionId, isLoading, selectSession } =
    useChatStore();
  const { isMobile } = useUIStore();

  // URL의 sessionId가 변경되면 해당 세션 로드
  useEffect(() => {
    if (sessionId && sessionId !== currentSessionId) {
      // URL에 세션 ID가 있으면 해당 세션 선택
      selectSession(sessionId);
    } else if (!sessionId && currentSessionId) {
      // URL에 세션 ID가 없는데 현재 세션이 있으면 URL 업데이트
      navigate(`/chat/${currentSessionId}`, { replace: true });
    }
  }, [sessionId]);

  // 현재 세션이 변경되면 URL 업데이트
  useEffect(() => {
    if (currentSessionId && !sessionId) {
      // 세션이 새로 생성되었을 때 URL 업데이트
      navigate(`/chat/${currentSessionId}`, { replace: true });
    } else if (
      currentSessionId &&
      sessionId &&
      currentSessionId !== sessionId
    ) {
      // 사이드바에서 다른 세션 선택 시 URL 업데이트
      navigate(`/chat/${currentSessionId}`, { replace: true });
    } else if (!currentSessionId && sessionId) {
      // 세션이 클리어되면 홈으로 이동
      navigate("/", { replace: true });
    }
  }, [currentSessionId]);

  // 메시지가 있거나, 세션이 선택되어 로딩 중일 때 MessageList 표시
  const showMessageList =
    messages.length > 0 || (currentSessionId && isLoading);

  return (
    <MainLayout>
      {showMessageList ? (
        <>
          <MessageList />
          <ChatInput showNewChatButton />
        </>
      ) : isMobile ? (
        // 모바일: 입력창 하단 고정
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <WelcomeScreen />
            <SuggestedQuestions />
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-white via-white to-transparent pt-4">
            <ChatInput />
          </div>
        </div>
      ) : (
        // 데스크톱: 기존 중앙 레이아웃
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <WelcomeScreen />
          <ChatInput />
          <SuggestedQuestions />
        </div>
      )}
    </MainLayout>
  );
};
