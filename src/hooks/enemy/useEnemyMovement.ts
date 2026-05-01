import { useTick } from "@pixi/react";
import { type Enemy } from "../../store/game";
import { useGameStore } from "../../store/game";

const ENEMY_SPEED = 200;
const ENEMY_DESTROY_X = -100;

export const useEnemyMovement = (enemy: Enemy, onDestroy: () => void) => {
  const { updateEnemy } = useGameStore();

  useTick((ticker) => {
    const dt = ticker.deltaMS / 1000;
    const newX = enemy.x - ENEMY_SPEED * dt;
    updateEnemy(enemy.id, newX);
    if (newX < ENEMY_DESTROY_X) {
      onDestroy();
    }
  });
};