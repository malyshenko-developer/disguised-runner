import { useRef } from "react";
import { useTick } from "@pixi/react";

import { useGameStore } from "../store/game";

const SCORE_PER_SECOND = 1;

export const useScoreTimer = () => {
  const { gameRunning, addScore } = useGameStore();
  const accumulatorRef = useRef(0);

  useTick((ticker) => {
    if (!gameRunning) return;

    const deltaSeconds = ticker.deltaMS / 1000;
    accumulatorRef.current += deltaSeconds * SCORE_PER_SECOND;
    const toAdd = Math.floor(accumulatorRef.current);
    if (toAdd > 0) {
      addScore(toAdd);
      accumulatorRef.current -= toAdd;
    }
  });
};
