import { useEffect } from "react";
import { Assets, Rectangle, Texture } from "pixi.js";

import { paths } from "../assets/assetsPaths.ts";
import { useAssetStore } from "../store/assetStore.ts";

export const useAssetLoader = () => {
  const {
    assetsLoaded,
    setAssetsLoaded,
    setHeroTextures,
    setEnemyTextures,
    setBackgroundTextures,
  } = useAssetStore();

  useEffect(() => {
    if (assetsLoaded) return;

    const loadAll = async () => {
      const heroPromises = [];
      for (let i = 1; i <= 24; i++)
        heroPromises.push(Assets.load(paths.hero.idle(i)));
      for (let i = 1; i <= 5; i++)
        heroPromises.push(Assets.load(paths.hero.prerun(i)));
      for (let i = 6; i <= 18; i++)
        heroPromises.push(Assets.load(paths.hero.run(i)));
      for (let i = 1; i <= 12; i++)
        heroPromises.push(Assets.load(paths.hero.jump(i)));
      for (let i = 12; i <= 24; i++)
        heroPromises.push(Assets.load(paths.hero.fall(i)));
      const heroTextures = await Promise.all(heroPromises);
      setHeroTextures(heroTextures);

      const bgTextureMap: Record<string, Texture> = {};
      const bgPromises = paths.background.map(async (url) => {
        const texture = await Assets.load(url);
        const name = url.split("/").pop()?.replace(".png", "") || "";
        bgTextureMap[name] = texture;
      });
      await Promise.all(bgPromises);
      setBackgroundTextures(bgTextureMap);

      const enemyBase = await Assets.load(paths.enemy);
      const enemyFrames = [];
      for (let i = 0; i < 8; i++) {
        enemyFrames.push(
          new Texture({
            source: enemyBase,
            frame: new Rectangle(i * 80, 0, 80, 64),
          }),
        );
      }
      setEnemyTextures(enemyFrames);

      setTimeout(() => {
        setAssetsLoaded(true);
      }, 1000);
    };

    loadAll();
  }, [
    assetsLoaded,
    setAssetsLoaded,
    setHeroTextures,
    setEnemyTextures,
    setBackgroundTextures,
  ]);
};
