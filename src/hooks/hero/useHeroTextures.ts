import { useEffect, useState } from "react";
import { Assets, Texture } from "pixi.js";

export const useHeroTextures = () => {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    if (textures.length === 0) {
      const promises = [];
      for (let i = 1; i <= 24; i++) {
        const padded = i.toString().padStart(5, "0");

        promises.push(
          Assets.load(`/sprites/disguised/idle/idle_${padded}.png`),
        );
      }

      for (let i = 1; i <= 5; i++) {
        const padded = i.toString().padStart(5, "0");

        promises.push(
          Assets.load(`/sprites/disguised/run/prerun/prerun_${padded}.png`),
        );
      }

      for (let i = 6; i <= 18; i++) {
        const padded = i.toString().padStart(5, "0");

        promises.push(
          Assets.load(`/sprites/disguised/run/runloop/run_${padded}.png`),
        );
      }

      for (let i = 1; i <= 12; i++) {
        const padded = i.toString().padStart(5, "0");

        promises.push(Assets.load(`sprites/disguised/jump/jump_${padded}.png`));
      }

      for (let i = 12; i <= 24; i++) {
        const padded = i.toString().padStart(5, "0");

        promises.push(Assets.load(`sprites/disguised/fall/fall_${padded}.png`));
      }

      Promise.all(promises).then(setTextures);
    }
  }, []);

  return textures;
};
