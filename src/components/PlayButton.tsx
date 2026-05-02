import { useGameStore } from "../store/game";

export const PlayButton = () => {
  const { gameRunning, startGame } = useGameStore();

  if (gameRunning) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <button
        onClick={startGame}
        className="
          bg-gray-500 hover:bg-gray-400
          rounded-full w-24 h-24
          shadow-xl hover:shadow-2xl
          transition-all duration-200 transform hover:scale-105
          flex items-center justify-center
          cursor-pointer
        "
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};
