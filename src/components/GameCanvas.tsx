import { useEffect } from "react";
import { Application } from "@pixi/react";

import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { Enemy } from "./Enemy.tsx";

import { useGameStore } from "../store/game.ts";
import { useAssetStore } from "../store/assetStore.ts";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/gameConfig.ts";

import { useCollisionDetection } from "../hooks/useCollisionDetection.ts";
import { useScoreTimer } from "../hooks/useScoreTimer.ts";
import { useBackgroundMusic } from "../hooks/sound/useBackgroundMusic.ts";
import { useAssetLoader } from "../hooks/useAssetLoader.ts";

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
  const { assetsLoaded } = useAssetStore();

  useAssetLoader();

  useEffect(() => {
    if (!gameRunning) return;
    spawnEnemy();
    const id = setInterval(spawnEnemy, 3000);
    return () => clearInterval(id);
  }, [gameRunning, spawnEnemy]);

  if (!assetsLoaded) {
    return (
      <div className="w-[1200px] h-[600px] bg-gray-900 flex items-center justify-center text-white text-xl rounded">
        Loading assets... 🎮
      </div>
    );
  }

  return (
    <div className="relative w-[1200px] h-[600px] bg-gray-900">
      <TopBar />
      <PlayButton />
      <Application
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        backgroundColor={0x1a2336}
        className="border-2 border-[#596E84] rounded"
      >
        <GameContent />
      </Application>
      <GameOverOverlay />
    </div>
  );
};
