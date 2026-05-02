import { useEffect } from "react";
import { Application } from "@pixi/react";

import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { Enemy } from "./Enemy.tsx";

import { useGameStore } from "../store/game.ts";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/gameConfig.ts";
import { useCollisionDetection } from "../hooks/useCollisionDetection.ts";
import { useScoreTimer } from "../hooks/useScoreTimer.ts";
import { GameOverOverlay } from "./GameOverOverlay.tsx";
import { PlayButton } from "./PlayButton.tsx";

const GameContent = () => {
  const { enemies } = useGameStore();

  useCollisionDetection();
  useScoreTimer();

  return (
    <>
      <ParallaxBg />
      <Hero />
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} enemy={enemy} />
      ))}
    </>
  );
};

export const GameCanvas = () => {
  const { gameRunning, spawnEnemy, score, highScore } = useGameStore();

  useEffect(() => {
    if (!gameRunning) return;
    spawnEnemy();
    const id = setInterval(spawnEnemy, 3000);
    return () => clearInterval(id);
  }, [gameRunning, spawnEnemy]);

  return (
    <div className="relative w-fit h-fit">
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

      <PlayButton />

      <Application
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-[#596E84] rounded"
      >
        <GameContent />
      </Application>
      <GameOverOverlay />
    </div>
  );
};
