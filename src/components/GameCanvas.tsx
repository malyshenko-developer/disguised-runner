import { useEffect, useState } from "react";
import { Application } from "@pixi/react";

import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { Enemy } from "./Enemy.tsx";

import { useGameStore } from "../store/game.ts";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../config/gameConfig.ts";
import { useCollisionDetection } from "../hooks/useCollisionDetection.ts";

const GameContent = () => {
  const { gameRunning, enemies, startGame } =
    useGameStore();
  const [scrollX, setScrollX] = useState(0);

  useCollisionDetection();

  const toggleGame = () => startGame();

  return (
    <>
      <ParallaxBg
        scrollX={scrollX}
        setScrollX={setScrollX}
        gameRunning={gameRunning}
      />
      {!gameRunning && (
        <PlayButton running={gameRunning} onToggle={toggleGame} />
      )}
      <Hero />
      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          enemy={enemy}
        />
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
    <Application
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="border-2 border-[#596E84] rounded"
    >
      <GameContent />
    </Application>
  );
};
