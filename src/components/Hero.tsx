import {useEffect, useRef, useState} from "react";
import {type AnimatedSprite, Assets, Texture} from "pixi.js";

import {useHeroPhysics} from "../hooks/useHeroPhysics.ts";
import {useGameStore} from "../store/game.ts";

export const Hero = () => {
    const [textures, setTextures] = useState<Texture[]>([]);
    const [animState, setAnimState] = useState<"idle" | "prerun" | "run">("idle");
    const spriteRef = useRef<AnimatedSprite>(null);

    const {gameRunning} = useGameStore()
    const {heroY, jumpState, prerunCompleted} = useHeroPhysics(gameRunning, setAnimState)


    useEffect(() => {
        if (textures.length === 0) {
            const promises = []
            for (let i = 1; i <= 24; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`/sprites/disguised/idle/idle_${padded}.png`))
            }

            for (let i = 1; i <= 5; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`/sprites/disguised/run/prerun/prerun_${padded}.png`))
            }

            for (let i = 6; i <= 18; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`/sprites/disguised/run/runloop/run_${padded}.png`))
            }

            for (let i = 1; i <= 12; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`sprites/disguised/jump/jump_${padded}.png`))
            }

            for (let i = 12; i <= 24; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`sprites/disguised/fall/fall_${padded}.png`))
            }

            Promise.all(promises).then(setTextures)
        }
    }, []);

    useEffect(() => {
        if (gameRunning && animState === 'idle') {
            setAnimState('prerun');
        } else if (!gameRunning && animState !== 'idle') {
            setAnimState('idle');
        }
    }, [gameRunning]);

    useEffect(() => {
        if (animState !== 'prerun' || !spriteRef.current) return;

        spriteRef.current.onComplete = () => {
            setAnimState('run');
            prerunCompleted()
        };
    }, [animState]);

    useEffect(() => {
        spriteRef.current?.play();
    }, [textures.length, animState, jumpState]);



    const getTextures = () => {
        if (animState === 'idle') return textures.slice(0, 24);
        if (animState === 'prerun') return textures.slice(24, 29);

        if (jumpState === 'ground') return textures.slice(29, 42);

        if (jumpState === 'up') return textures.slice(42, 54);
        return textures.slice(54);
    };

    if (textures.length === 0) return null;

    return (
        <pixiAnimatedSprite
            ref={spriteRef}
            textures={getTextures()}
            animationSpeed={0.2}
            loop={animState !== 'prerun'}
            x={600} y={heroY}
            anchor={0.5}
            scale={0.4}
        />
    )
}