import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Question from "./CreatorOnly.Settings.Question";
import Story from "./CreatorOnly.Settings.Story";
import Quiz from "./CreatorOnly.Settings.Quiz";
import QuizCreateModal from "./CreatorOnly.Settings.QuizCreateModal";

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fanmeetingId } = useParams();
  const [currentPath, serCurrentPath] = useState("question");
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizSequence, setQuizSequence] = useState<number>(1);
  const [fetchSignal, setFetchSignal] = useState<boolean>(false);

  useEffect(() => {
    serCurrentPath(location.pathname.split("/").pop() || "question");
  }, [location.pathname]);

  const handleLocation = (path: string) => {
    navigate(`/creator-only/${fanmeetingId}/${path}`);
  };
  console.log(currentPath);

  const handleQuizOpen = () => {
    setIsQuizModalOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizModalOpen(false);
  };

  const handleQuizSequence = (sequence: number) => {
    setQuizSequence(sequence);
  };

  const handleFetchSignal = () => {
    setFetchSignal(!fetchSignal);
  };

  return (
    <>
      <div className="relative">
        {isQuizModalOpen ? (
          <div className="w-full h-full bg-black absolute opacity-70" />
        ) : null}

        <div className="w-screen bg-white py-8 flex flex-col items-center">
          <p className="w-[40%] mb-5 flex justify-around text-h4 text-gray-700">
            <button
              type="button"
              onClick={() => handleLocation("question")}
              className={currentPath === "question" ? "text-secondary" : ""}
            >
              Q&A 관리
            </button>{" "}
            <button
              type="button"
              onClick={() => handleLocation("story")}
              className={currentPath === "story" ? "text-secondary" : ""}
            >
              사연 관리
            </button>{" "}
            <button
              type="button"
              onClick={() => handleLocation("quiz")}
              className={currentPath === "quiz" ? "text-secondary" : ""}
            >
              O/X 퀴즈
            </button>
          </p>
          <div className="rounded-lg bg-page-background text-gray-700 text-medium px-8 py-5 text-center">
            {currentPath === "question" ? (
              <>
                <p>팬분들이 남겨주신 질문 목록입니다!</p>
                <p>팬미팅에 사용할 질문에 선택 버튼을 클릭해주세요.</p>
              </>
            ) : null}
            {currentPath === "story" ? (
              <>
                <p>팬분들이 남겨주신 사연 목록입니다!</p>
                <p>상세 보기 화면에서 소개하고 싶은 사연을 선택하세요.</p>
              </>
            ) : null}
            {currentPath === "quiz" ? (
              <>
                <p>팬미팅 O/X 퀴즈 코너에서 사용할 문제입니다.</p>
                <p>문제와 답, 간단한 설명을 입력해주세요.</p>
              </>
            ) : null}
          </div>
        </div>
        {currentPath === undefined || currentPath === "question" ? (
          <Question />
        ) : null}
        {currentPath === "story" ? <Story /> : null}
        {currentPath === "quiz" ? (
          <Quiz
            handleQuizOpen={handleQuizOpen}
            handleQuizSequence={handleQuizSequence}
            fetchSignal={fetchSignal}
          />
        ) : null}
      </div>
      {isQuizModalOpen ? (
        <QuizCreateModal
          handleQuizClose={handleQuizClose}
          quizSequence={quizSequence}
          handleQuizSequence={handleQuizSequence}
          handleFetchSignal={handleFetchSignal}
        />
      ) : null}
    </>
  );
}

export default Settings;
