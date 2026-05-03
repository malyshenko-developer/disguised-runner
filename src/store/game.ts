import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_SPAWN_X,
  HERO_Y_BASE,
} from "../config/gameConfig";

export interface Enemy {
  id: number;
  x: number;
  width: number;
  height: number;
}

interface GameState {
  gameRunning: boolean;
  score: number;
  gameOver: boolean;
  enemies: Enemy[];
  highScore: number;
  startGame: () => void;
  setGameOver: () => void;
  closeGameOver: () => void;
  addScore: (points: number) => void;
  spawnEnemy: () => void;
  updateEnemy: (id: number, x: number) => void;
  removeEnemy: (id: number) => void;
  heroY: number;
  updateHeroY: (y: number) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, _get) => ({
      gameRunning: false,
      score: 0,
      gameOver: false,
      enemies: [],
      heroY: HERO_Y_BASE,
      highScore: 0,
      soundEnabled: true,

      startGame: () =>
        set({
          gameRunning: true,
          score: 0,
          gameOver: false,
          enemies: [],
          heroY: HERO_Y_BASE,
        }),

      setGameOver: () =>
        set((state) => ({
          gameRunning: false,
          gameOver: true,
          enemies: [],
          heroY: HERO_Y_BASE,
          highScore:
            state.score > state.highScore ? state.score : state.highScore,
        })),

      closeGameOver: () => set({ gameOver: false }),

      addScore: (points: number) =>
        set((state) => ({ score: state.score + points })),

      spawnEnemy: () => {
        const id = Date.now();
        set((state) => ({
          enemies: [
            ...state.enemies,
            { id, x: ENEMY_SPAWN_X, width: ENEMY_WIDTH, height: ENEMY_HEIGHT },
          ],
        }));
      },

      updateEnemy: (id: number, x: number) => {
        set((state) => ({
          enemies: state.enemies.map((e) => (e.id === id ? { ...e, x } : e)),
        }));
      },

      removeEnemy: (id: number) => {
        set((state) => ({
          enemies: state.enemies.filter((e) => e.id !== id),
        }));
      },

      updateHeroY: (y: number) => set({ heroY: y }),

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({
        highScore: state.highScore,
        soundEnabled: state.soundEnabled,
      }),
    },
  ),
);
