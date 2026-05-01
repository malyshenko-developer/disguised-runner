import { useTick } from "@pixi/react";

import { useGameStore } from "../store/game.ts";
import {
  ENEMY_HITBOX,
  ENEMY_SCALE,
  ENEMY_Y,
  HERO_HITBOX,
  HERO_X,
} from "../config/gameConfig.ts";

export const useCollisionDetection = () => {
  const { gameRunning, enemies, heroY, setGameOver } = useGameStore();

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
};