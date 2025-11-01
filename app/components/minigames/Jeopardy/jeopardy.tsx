import { useState, useRef, useContext, useEffect, use } from "react";
import impossibleQuestions2 from "./impossibleQuestions2.js";
import { useMinigamesContext } from "~/context/MinigamesContext.js";
import { useGlobalContext } from "~/context/GlobalContext.js";

const shuffleArray = (array: any[]) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

const Jeopardy = () => {
  const { updateHumanPercentage } = useGlobalContext();
  const { nextLevel, updateDescription } = useMinigamesContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(
    shuffleArray(impossibleQuestions2).slice(0, 5)
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [timer, setTimer] = useState(10);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    updateDescription("Répondez aux questions pour prouver que vous êtes humain.");
  }, [updateDescription]);

  // shuffle options à chaque nouvelle question
  useEffect(() => {
    setShuffledOptions(shuffleArray(questions[currentIndex].options));
    setTimer(10);
  }, [currentIndex, questions]);

  // gestion du timer
  useEffect(() => {
    if (timer <= 0) {
      alert("Temps écoulé ! Le quiz va recommencer.");
      resetQuiz();
      return;
    }

    timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleAnswer = (option: string) => {
    if (showAnswer) return;

    setSelected(option);
    setShowAnswer(true);

    const isCorrect = option === questions[currentIndex].answer;
    const newScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      if (currentIndex < 4) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
        setScore(newScore);
      } else {
        setScore(newScore);
        updateHumanPercentage((5 - score) * 20, 20);
        alert(`Quiz terminé ! Score : ${newScore}/5`);
        nextLevel();
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelected(null);
    setShowAnswer(false);
    setQuestions(shuffleArray(impossibleQuestions2).slice(0, 5));
    setTimer(10);
  };

  const q = questions[currentIndex];

  return (
    <div className="h-full items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center justify-center h-150 bg-gray-900 text-white">
        {/* Timer */}
        <div className="mb-4 text-2xl font-bold">Temps restant : {timer}s</div>

        {/* Question */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-3/4 text-center mb-6 text-xl font-semibold">
          {q.question}
        </div>

        {/* Options 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option, i) => {
            const isCorrect = option === q.answer;
            const isSelected = option === selected;

            return (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className={`w-48 h-24 rounded-xl text-lg font-medium transition-all duration-300
                ${showAnswer
                    ? isCorrect
                      ? "bg-green-600 scale-105"
                      : isSelected
                        ? "bg-red-600 scale-95"
                        : "bg-gray-700"
                    : "bg-gray-700 hover:bg-gray-600 active:scale-95"
                  }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Progression */}
        <div className="mt-8 text-lg">
          Question {currentIndex + 1} / 5 | Score : {score}
        </div>
      </div>
    </div>
  );
};

export default Jeopardy;
