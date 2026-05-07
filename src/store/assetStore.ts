import { create } from "zustand";
import { Texture } from "pixi.js";

interface AssetState {
  assetsLoaded: boolean;
  heroTextures: Texture[];
  enemyTextures: Texture[];
  backgroundTextures: Record<string, Texture>;
  setAssetsLoaded: (loaded: boolean) => void;
  setHeroTextures: (textures: Texture[]) => void;
  setEnemyTextures: (textures: Texture[]) => void;
  setBackgroundTextures: (textures: Record<string, Texture>) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  assetsLoaded: false,
  heroTextures: [],
  enemyTextures: [],
  backgroundTextures: {},
  setAssetsLoaded: (loaded) => set({ assetsLoaded: loaded }),
  setHeroTextures: (textures) => set({ heroTextures: textures }),
  setEnemyTextures: (textures) => set({ enemyTextures: textures }),
  setBackgroundTextures: (textures) => set({ backgroundTextures: textures }),
}));
