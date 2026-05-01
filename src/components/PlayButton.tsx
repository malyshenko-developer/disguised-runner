import { useEffect, useState } from "react";
import { Assets, Texture } from "pixi.js";
import { useGameStore } from "../store/game";

const PLAY_BUTTON_TEXTURE_PATH = "/sprites/ui/play.png";
const PLAY_BUTTON_X = 600;
const PLAY_BUTTON_Y = 180;
const PLAY_BUTTON_WIDTH = 102;
const PLAY_BUTTON_HEIGHT = 102;

export const PlayButton = () => {
  const [texture, setTexture] = useState<Texture | null>(null);
  const { gameRunning, startGame } = useGameStore();

  useEffect(() => {
    Assets.load(PLAY_BUTTON_TEXTURE_PATH).then(setTexture);
  }, []);

  if (!texture || gameRunning) return null;

  return (
    <pixiSprite
      texture={texture}
      x={PLAY_BUTTON_X}
      y={PLAY_BUTTON_Y}
      anchor={0.5}
      width={PLAY_BUTTON_WIDTH}
      height={PLAY_BUTTON_HEIGHT}
      eventMode="static"
      cursor="pointer"
      onPointerDown={startGame}
    />
  );
};