import { create } from "zustand";

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
  startGame: () => void;
  setGameOver: () => void;
  addScore: (points: number) => void;
  spawnEnemy: () => void;
  updateEnemy: (id: number, x: number) => void;
  removeEnemy: (id: number) => void;
  heroY: number;
  updateHeroY: (y: number) => void;
}

export const useGameStore = create<GameState>()((set, _get) => ({
  gameRunning: false,
  score: 0,
  gameOver: false,
  enemies: [],
  heroY: 470,

  startGame: () =>
    set({
      gameRunning: true,
      score: 0,
      gameOver: false,
      enemies: [],
      heroY: 470,
    }),
  setGameOver: () =>
    set({ gameRunning: false, gameOver: true, enemies: [], heroY: 470 }),
  addScore: (points: number) =>
    set((state) => ({ score: state.score + points })),
  spawnEnemy: () => {
    const id = Date.now();
    set((state) => ({
      enemies: [...state.enemies, { id, x: 1400, width: 64, height: 64 }],
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
}));
