import { useEffect, useRef } from "react";
import { type AnimatedSprite } from "pixi.js";

import { useEnemyMovement } from "../hooks/enemy/useEnemyMovement.ts";

import { type Enemy as IEnemy } from "../store/game.ts";
import { ENEMY_SCALE, ENEMY_Y } from "../config/gameConfig.ts";
import { useAssetStore } from "../store/assetStore.ts";

interface EnemyProps {
  enemy: IEnemy;
}

export const Enemy = ({ enemy }: EnemyProps) => {
  const spriteRef = useRef<AnimatedSprite>(null);

  const { enemyTextures } = useAssetStore();

  useEnemyMovement(enemy);

  useEffect(() => {
    spriteRef.current?.play();
  }, [enemyTextures.length]);

  if (enemyTextures.length === 0) return null;

  return (
    <pixiAnimatedSprite
      ref={spriteRef}
      textures={enemyTextures}
      animationSpeed={0.25}
      loop
      x={enemy.x}
      y={ENEMY_Y}
      anchor={0.5}
      scale={ENEMY_SCALE}
    />
  );
};
