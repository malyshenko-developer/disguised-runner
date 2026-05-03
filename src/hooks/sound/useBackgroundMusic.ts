import { useEffect, useRef } from "react";
import { Howl } from "howler";

import { useGameStore } from "../../store/game.ts";

export const useBackgroundMusic = () => {
  const { soundEnabled } = useGameStore();
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["/music/lofi-cozy.mp3"],
        loop: true,
        autoplay: true,
        volume: 0.4,
      });
    }
  }, []);

  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;

    if (soundEnabled) {
      if (!sound.playing()) {
        sound.play();
      }
    } else {
      if (sound.playing()) {
        sound.pause();
      }
    }
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      soundRef.current?.stop();
      soundRef.current?.unload();
    };
  }, []);
};
