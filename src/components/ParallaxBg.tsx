import { useState } from "react";
import { useTick } from "@pixi/react";

import { useGameStore } from "../store/game";
import { useAssetStore } from "../store/assetStore";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/gameConfig";

import { paths } from "../assets/assetsPaths";

const PARALLAX_SPEED_FACTOR = 2;
const PARALLAX_TILE_Y = 620;

const getFileName = (url: string) => {
  const parts = url.split("/");
  const file = parts.pop() || "";
  return file.replace(".png", "");
};

export const ParallaxBg = () => {
  const { gameRunning, gameSpeedMultiplier } = useGameStore();
  const { backgroundTextures } = useAssetStore();
  const [scrollX, setScrollX] = useState(0);

  useTick((ticker) => {
    if (gameRunning) {
      setScrollX(
        (prev) =>
          prev + PARALLAX_SPEED_FACTOR * gameSpeedMultiplier * ticker.deltaTime,
      );
    }
  });

  return (
    <>
      {paths.background.map((url, index) => {
        const name = getFileName(url);
        const texture = backgroundTextures[name];
        if (!texture) return null;
        const speed = index * 0.08;
        return (
          <pixiTilingSprite
            key={name}
            texture={texture}
            tilePosition={{ x: -scrollX * speed, y: PARALLAX_TILE_Y }}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            tileScale={{ x: 1, y: 1 }}
          />
        );
      })}
    </>
  );
};
