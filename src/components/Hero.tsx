import { useCallback, useEffect, useRef, useState } from "react";
import { type AnimatedSprite } from "pixi.js";
import { useHeroPhysics } from "../hooks/hero/useHeroPhysics";
import { useHeroTextures } from "../hooks/hero/useHeroTextures";
import { useHeroSounds } from "../hooks/hero/useHeroSounds";
import { useGameStore } from "../store/game";
import { HERO_X } from "../config/gameConfig";

export const Hero = () => {
  const [animState, setAnimState] = useState<"idle" | "prerun" | "run">("idle");
  const spriteRef = useRef<AnimatedSprite>(null);

  const { gameRunning } = useGameStore();

  const textures = useHeroTextures();
  const { playJump, playLand } = useHeroSounds();

  const onTouchGround = useCallback(() => {
    playLand();
  }, [playLand]);

  const onLanding = useCallback(() => {
    setAnimState("prerun");
  }, []);

  const { heroY, jumpState, prerunCompleted } = useHeroPhysics(
    gameRunning,
    onLanding,
    onTouchGround,
  );

  const prevJumpState = useRef<string>(jumpState);
  useEffect(() => {
    if (jumpState === "up" && prevJumpState.current !== "up") {
      playJump();
    }
    prevJumpState.current = jumpState;
  }, [jumpState, playJump]);

  useEffect(() => {
    if (gameRunning && animState === "idle") {
      setAnimState("prerun");
    } else if (!gameRunning && animState !== "idle") {
      setAnimState("idle");
    }
  }, [gameRunning, animState]);

  useEffect(() => {
    if (animState !== "prerun" || !spriteRef.current) return;
    spriteRef.current.onComplete = () => {
      setAnimState("run");
      prerunCompleted();
    };
  }, [animState, prerunCompleted]);

  useEffect(() => {
    spriteRef.current?.play();
  }, [textures.length, animState, jumpState]);

  const getTextures = () => {
    if (animState === "idle") return textures.slice(0, 24);
    if (animState === "prerun") return textures.slice(24, 29);
    if (jumpState === "ground") return textures.slice(29, 42);
    if (jumpState === "up") return textures.slice(42, 54);
    return textures.slice(54);
  };

  if (textures.length === 0) return null;

  return (
    <pixiAnimatedSprite
      ref={spriteRef}
      textures={getTextures()}
      animationSpeed={0.2}
      loop={animState !== "prerun"}
      x={HERO_X}
      y={heroY}
      anchor={0.5}
      scale={0.4}
    />
  );
};
