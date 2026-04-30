import {useEffect, useRef, useState} from "react";
import {type AnimatedSprite, Assets, Texture} from "pixi.js";
import {useTick} from "@pixi/react";
import {useGameStore} from "../store/game.ts";

const HERO_Y_BASE = 470

interface HeroProps {
    scrollX: number
    running: boolean
}

export const Hero = ({running}: HeroProps) => {
    const [textures, setTextures] = useState<Texture[]>([]);
    const [animState, setAnimState] = useState<"idle" | "prerun" | "run">("idle");
    const spriteRef = useRef<AnimatedSprite>(null);

    const [heroY, setHeroY] = useState(HERO_Y_BASE);
    const [jumpState, setJumpState] = useState<'ground' | 'up' | 'down'>('ground');
    const landingGrace = useRef(0);
    const canJump = useRef(true);
    const physics = useRef({ y: HERO_Y_BASE, vy: 0, grounded: true });

    const updateHeroY = useGameStore(state => state.updateHeroY);

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
        if (running && animState === 'idle') {
            setAnimState('prerun');
        } else if (!running && animState !== 'idle') {
            setAnimState('idle');
        }
    }, [running]);

    useEffect(() => {
        const handleJump = (e: KeyboardEvent) => {
            if (e.code === "Space" && physics.current.grounded && canJump.current) {
                physics.current.vy = -460;
                physics.current.grounded = false;
            }
        };
        window.addEventListener("keydown", handleJump);
        return () => window.removeEventListener("keydown", handleJump);
    }, []);

    useEffect(() => {
        if (animState !== 'prerun' || !spriteRef.current) return;

        spriteRef.current.onComplete = () => {
            setAnimState('run');
            canJump.current = true
        };
    }, [animState]);

    useEffect(() => {
        spriteRef.current?.play();
    }, [textures.length, animState, jumpState]);

    useTick((ticker) => {
        const dt = ticker.deltaMS / 1000;

        if (landingGrace.current > 0) {
            landingGrace.current -= ticker.deltaMS;

            if (landingGrace.current <= 0) {
                setAnimState('prerun');
                setJumpState('ground');
            }
            return;
        }

        if (physics.current.grounded) {
            if (jumpState !== 'ground') setJumpState('ground');
            return;
        }

        physics.current.vy += 800 * dt;
        physics.current.y += physics.current.vy * dt;
        setHeroY(physics.current.y);
        updateHeroY(physics.current.y);

        if (jumpState === 'ground') {
            setJumpState('up');
        } else if (jumpState === 'up' && physics.current.vy >= 0) {
            setJumpState('down');
        }

        if (physics.current.y >= 470) {
            physics.current.y = 470;
            physics.current.vy = 0;
            physics.current.grounded = true;
            setHeroY(470)
            updateHeroY(470);

            landingGrace.current = 400;
            canJump.current = false
            setJumpState('down');
        }
    });

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