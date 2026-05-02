import { useState, useEffect } from "react";
import { useGameStore } from "../store/game";

export const GameOverOverlay = () => {
  const { gameOver, closeGameOver, score, highScore } = useGameStore();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setVisible(true);
      setClosing(false);
    } else {
      if (visible) {
        setClosing(true);
        const timer = setTimeout(() => {
          setVisible(false);
          setClosing(false);
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, [gameOver]);

  if (!visible) return null;

  const handleClose = () => {
    closeGameOver();
  };

  return (
    <div
      className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/40 backdrop-blur-sm
      transition-all duration-200
      ${closing ? "opacity-0 scale-95" : "animate-fade-in-scale"}
    `}
      onClick={handleClose}
    >
      <div
        className="relative bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white mb-4">Game Over</h2>
        <div className="text-5xl font-black text-indigo-400 my-3">{score}</div>
        <div className="text-lg text-gray-400">
          🏆 The Best Score: {highScore}
        </div>
        <p className="mt-4 text-sm text-gray-500">Close to continue</p>
      </div>
    </div>
  );
};
