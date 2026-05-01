import { useEffect, useRef, useState } from "react";
import { type AnimatedSprite, Assets, Rectangle, Texture } from "pixi.js";
import { useTick } from "@pixi/react";
import { useGameStore, type Enemy as IEnemy } from "../store/game.ts";

interface EnemyProps {
  enemy: IEnemy;
  onDestroy: () => void;
}

export const Enemy = ({ enemy, onDestroy }: EnemyProps) => {
  const [textures, setTextures] = useState<Texture[]>([]);
  const spriteRef = useRef<AnimatedSprite>(null);

  const { updateEnemy } = useGameStore();

  const speed = 200;

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < 8; i++) {
      promises.push(
        Assets.load("/sprites/enemies/mushroom/mushroom.png").then(
          (texture) => {
            const frame = new Rectangle(i * 80, 0, 80, 64);
            return new Texture({ source: texture, frame });
          },
        ),
      );
    }
    Promise.all(promises).then(setTextures);
  }, []);

  useTick((ticker) => {
    const dt = ticker.deltaMS / 1000;
    const newX = enemy.x - speed * dt;
    updateEnemy(enemy.id, newX);

    if (newX < -100) {
      onDestroy();
    }
  });

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
      y={520}
      anchor={0.5}
      scale={1.4}
    />
  );
};
