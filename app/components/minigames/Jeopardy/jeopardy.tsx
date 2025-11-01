import { useState, useRef } from "react";
import impossibleQuestions2 from "./impossibleQuestions2.js"; // ton tableau de questions

const Jeopardy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions] = useState(
    Array.from({ length: 5 }, () =>
      impossibleQuestions2[Math.floor(Math.random() * impossibleQuestions2.length)]
    )
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Référence de l'audio
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const handleAnswer = (option: string) => {
    if (showAnswer) return;

    setSelected(option);
    setShowAnswer(true);

    if (option === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < 4) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        alert(
          `Quiz terminé ! Score : ${
            score + (option === questions[currentIndex].answer ? 1 : 0)
          } / 5`
        );
      }
    }, 1200);
  };

  const q = questions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Audio */}
      <audio ref={audioRef} src="/audio/background.mp3" />

      {/* Question */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-3/4 text-center mb-6 text-xl font-semibold">
        {q.question}
      </div>

      {/* Options 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {q.options.map((option, i) => {
          const isCorrect = option === q.answer;
          const isSelected = option === selected;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={`w-48 h-24 rounded-xl text-lg font-medium transition-all duration-300
                ${
                  showAnswer
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
  );
};

export default Jeopardy;
