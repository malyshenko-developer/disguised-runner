import { useEffect, useRef } from "react";
import { Howl } from "howler";

import { useGameStore } from "../../store/game";

export const useHeroSounds = () => {
  const { soundEnabled } = useGameStore();
  const jumpSound = useRef<Howl | null>(null);
  const landSound = useRef<Howl | null>(null);

  useEffect(() => {
    if (!jumpSound.current) {
      jumpSound.current = new Howl({
        src: ["/music/jump.mp3"],
        volume: 0.8,
      });
    }
    if (!landSound.current) {
      landSound.current = new Howl({
        src: ["/music/land.mp3"],
        volume: 0.6,
      });
    }
  }, []);

  const playJump = () => {
    if (soundEnabled) {
      jumpSound.current?.play();
    }
  };

  const playLand = () => {
    if (soundEnabled) {
      landSound.current?.play();
    }
  };

  return { playJump, playLand };
};
