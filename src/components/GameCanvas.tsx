import { useEffect } from "react";
import { Application } from "@pixi/react";

import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { Enemy } from "./Enemy.tsx";

import { useGameStore } from "../store/game.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/gameConfig.ts";

import { useCollisionDetection } from "../hooks/useCollisionDetection.ts";
import { useScoreTimer } from "../hooks/useScoreTimer.ts";
import { useBackgroundMusic } from "../hooks/sound/useBackgroundMusic.ts";

import { GameOverOverlay } from "./GameOverOverlay.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { TopBar } from "./TopBar.tsx";

const GameContent = () => {
  const { enemies } = useGameStore();

  useCollisionDetection();
  useScoreTimer();
  useBackgroundMusic();

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
  const { gameRunning, spawnEnemy } = useGameStore();

  useEffect(() => {
    if (!gameRunning) return;
    spawnEnemy();
    const id = setInterval(spawnEnemy, 3000);
    return () => clearInterval(id);
  }, [gameRunning, spawnEnemy]);

  return (
    <div className="relative w-fit h-fit">
      <TopBar />

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
