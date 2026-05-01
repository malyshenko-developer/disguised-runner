import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useTick } from "@pixi/react";
import { Assets, Texture } from "pixi.js";

interface ParallaxBgProps {
  scrollX: number;
  setScrollX: Dispatch<SetStateAction<number>>;
  gameRunning: boolean;
}

export const ParallaxBg = ({
  scrollX,
  setScrollX,
  gameRunning,
}: ParallaxBgProps) => {
  const [textures, setTextures] = useState<{ [key: string]: Texture }>({});

  const layerOrder = [
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

  useEffect(() => {
    layerOrder.forEach((name) => {
      Assets.load(`/sprites/background/${name}.png`).then((texture) => {
        setTextures((prev) => ({ ...prev, [name]: texture }));
      });
    });
  }, []);

  useTick((ticker) => {
    if (gameRunning) {
      setScrollX((s) => s + 2 * ticker.deltaTime);
    }
  });

  return (
    <>
      {layerOrder.map((name, index) => {
        const texture = textures[name];
        if (!texture) return null;

        const speed = index * 0.08;

        return (
          <pixiTilingSprite
            key={name}
            texture={texture}
            tilePosition={{ x: -scrollX * speed, y: 620 }}
            width={1200}
            height={600}
            tileScale={{ x: 1, y: 1 }}
          />
        );
      })}
    </>
  );
};
