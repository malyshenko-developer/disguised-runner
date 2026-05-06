import { useEffect, useState } from "react";
import { useTick } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

import { useGameStore } from "../store/game";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/gameConfig";

const PARALLAX_SPEED_FACTOR = 2;
const PARALLAX_TILE_Y = 620;
const BACKGROUND_LAYERS = [
  "Layer_0011_0",
  "Layer_0010_1",
  "Layer_0009_2",
  "Layer_0008_3",
  "Layer_0007_Lights",
  "Layer_0006_4",
  "Layer_0005_5",
  "Layer_0004_Lights",
  "Layer_0003_6",
  "Layer_0002_7",
  "Layer_0001_8",
  "Layer_0000_9",
];

export const ParallaxBg = () => {
  const { gameRunning, gameSpeedMultiplier } = useGameStore();
  const [scrollX, setScrollX] = useState(0);
  const [textures, setTextures] = useState<Record<string, Texture>>({});

  useEffect(() => {
    BACKGROUND_LAYERS.forEach((name) => {
      Assets.load(`/sprites/background/${name}.png`).then((texture) => {
        setTextures((prev) => ({ ...prev, [name]: texture }));
      });
    });
  }, []);

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
      {BACKGROUND_LAYERS.map((name, index) => {
        const texture = textures[name];
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
