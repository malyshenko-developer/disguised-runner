import { useGameStore } from "../store/game.ts";

export const TopBar = () => {
  const { score, highScore } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-start p-4 pointer-events-none z-10">
      <div className="pointer-events-auto"></div>
      <div className="flex gap-4 bg-black/40 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20 shadow-lg items-center">
        <span className="text-white font-mono font-bold tracking-wider">
          ✨{score}
        </span>
        <span className="text-white/70 font-mono text-sm">
          Best: {highScore}
        </span>
      </div>
    </div>
  );
};
