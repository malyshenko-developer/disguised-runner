import { useCallback, useEffect, useRef, useState } from "react";
import { type AnimatedSprite } from "pixi.js";
import { useApplication } from "@pixi/react";

import { useHeroSounds } from "../hooks/hero/useHeroSounds";
import { useDustParticles } from "../hooks/hero/useDustParticles.ts";
import { useHeroPhysics } from "../hooks/hero/useHeroPhysics.ts";

import { useGameStore } from "../store/game";
import { HERO_X } from "../config/gameConfig";
import { useAssetStore } from "../store/assetStore.ts";

export const Hero = () => {
  const [animState, setAnimState] = useState<"idle" | "prerun" | "run">("idle");
  const spriteRef = useRef<AnimatedSprite>(null);
  const slowmoTimerRef = useRef<number | null>(null);

  const { gameRunning } = useGameStore();
  const { heroTextures } = useAssetStore();

  const { playJump, playLand } = useHeroSounds();
  const { app } = useApplication();

  const spawnDust = useDustParticles(app);

  const onTouchGround = useCallback(() => {
    playLand();
    if (spriteRef.current) {
      spawnDust(spriteRef.current.x, spriteRef.current.y + 80);
    }

    const { setGameSpeedMultiplier } = useGameStore.getState();
    setGameSpeedMultiplier(0.4);

    if (slowmoTimerRef.current) {
      clearTimeout(slowmoTimerRef.current);
    }
    slowmoTimerRef.current = setTimeout(() => {
      setGameSpeedMultiplier(1);
    }, 500);
  }, [playLand, spawnDust]);

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
      if (spriteRef.current) {
        spawnDust(spriteRef.current.x, spriteRef.current.y + 60);
      }
    }
    prevJumpState.current = jumpState;
  }, [jumpState, playJump, spawnDust]);

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
  }, [heroTextures.length, animState, jumpState]);

  const getTextures = () => {
    if (animState === "idle") return heroTextures.slice(0, 24);
    if (animState === "prerun") return heroTextures.slice(24, 29);
    if (jumpState === "ground") return heroTextures.slice(29, 42);
    if (jumpState === "up") return heroTextures.slice(42, 54);
    return heroTextures.slice(54);
  };

  if (heroTextures.length === 0) return null;

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
