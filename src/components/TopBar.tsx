import SoundOn from "../assets/icons/sound-on.svg?react";
import SoundOff from "../assets/icons/sound-off.svg?react";

import { useGameStore } from "../store/game.ts";

export const TopBar = () => {
  const { score, highScore, toggleSound, soundEnabled } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-start p-4 pointer-events-none z-30">
      <div className="pointer-events-auto flex gap-2">
        <button
          onClick={toggleSound}
          className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:bg-black/60 transition cursor-pointer"
          aria-label="Toggle sound"
        >
          {soundEnabled ? (
            <SoundOn className="w-8 h-8 fill-current" />
          ) : (
            <SoundOff className="w-8 h-8 fill-current" />
          )}
        </button>
      </div>
      <div className="flex gap-4 bg-black/40 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)] items-center">
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
