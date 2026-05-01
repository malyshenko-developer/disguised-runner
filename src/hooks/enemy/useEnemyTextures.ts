import { useEffect, useState } from "react";
import { Assets, Rectangle, Texture } from "pixi.js";

export const useEnemyTextures = () => {
  const [textures, setTextures] = useState<Texture[]>([]);

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

  return textures;
}