import { useEffect, useState } from "react";
import { Application, useTick } from "@pixi/react";

import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { Enemy } from "./Enemy.tsx";

import { useGameStore } from "../store/game.ts";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ENEMY_HITBOX,
  ENEMY_SCALE,
  ENEMY_Y,
  HERO_HITBOX,
  HERO_X,
} from "../config/gameConfig.ts";

const GameContent = () => {
  const { gameRunning, enemies, heroY, setGameOver, startGame, removeEnemy } =
    useGameStore();
  const [scrollX, setScrollX] = useState(0);

  useTick(() => {
    if (!gameRunning) return;
    if (enemies.length === 0) return;

    const heroLeft = HERO_X - HERO_HITBOX.width / 2;
    const heroRight = HERO_X + HERO_HITBOX.width / 2;
    const heroTop = heroY + HERO_HITBOX.offsetY - HERO_HITBOX.height / 2;
    const heroBottom = heroY + HERO_HITBOX.offsetY + HERO_HITBOX.height / 2;

    for (const enemy of enemies) {
      const spriteWidth = enemy.width * ENEMY_SCALE;
      const spriteHeight = enemy.height * ENEMY_SCALE;
      const hitboxWidth = spriteWidth * ENEMY_HITBOX.scale;
      const hitboxHeight = spriteHeight * ENEMY_HITBOX.scale;

      const enemyLeft = enemy.x - hitboxWidth / 2;
      const enemyRight = enemy.x + hitboxWidth / 2;
      const enemyTop = ENEMY_Y + ENEMY_HITBOX.offsetY - hitboxHeight / 2;
      const enemyBottom = ENEMY_Y + ENEMY_HITBOX.offsetY + hitboxHeight / 2;

      if (
        enemyRight > heroLeft &&
        enemyLeft < heroRight &&
        enemyBottom > heroTop &&
        enemyTop < heroBottom
      ) {
        setGameOver();
        break;
      }
    }
  });

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
          onDestroy={() => removeEnemy(enemy.id)}
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
