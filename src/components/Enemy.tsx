import { useEffect, useRef } from "react";
import { type AnimatedSprite } from "pixi.js";

import { type Enemy as IEnemy } from "../store/game.ts";

import { ENEMY_SCALE, ENEMY_Y } from "../config/gameConfig.ts";
import { useEnemyTextures } from "../hooks/enemy/useEnemyTextures.ts";
import { useEnemyMovement } from "../hooks/enemy/useEnemyMovement.ts";

interface EnemyProps {
  enemy: IEnemy;
}

export const Enemy = ({ enemy }: EnemyProps) => {
  const textures = useEnemyTextures()
  const spriteRef = useRef<AnimatedSprite>(null);

  useEnemyMovement(enemy);

  useEffect(() => {
    spriteRef.current?.play();
  }, [textures.length]);

  if (textures.length === 0) return null;

  return (
    <pixiAnimatedSprite
      ref={spriteRef}
      textures={textures}
      animationSpeed={0.25}
      loop
      x={enemy.x}
      y={ENEMY_Y}
      anchor={0.5}
      scale={ENEMY_SCALE}
    />
  );
};
