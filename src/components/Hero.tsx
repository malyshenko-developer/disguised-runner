import {useEffect, useRef, useState} from "react";
import { Assets, Texture} from "pixi.js";

interface HeroProps {
    scrollX: number
    running: boolean
}

export const Hero = ({running}: HeroProps) => {
    const [textures, setTextures] = useState<Texture[]>([]);
    const [animState, setAnimState] = useState<"idle" | "prerun" | "run">("idle");
    const spriteRef = useRef<any>(null);

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
        if (animState !== 'prerun' || !spriteRef.current) return;

        spriteRef.current.onComplete = () => {
            setAnimState('run');
            spriteRef.current!.onComplete = null;
        };
    }, [animState]);

    useEffect(() => {
        spriteRef.current?.play();
    }, [textures.length, animState]);

    const getTextures = () => {
        if (animState === 'idle') return textures.slice(0, 24);
        if (animState === 'prerun') return textures.slice(24, 29);
        return textures.slice(29);
    };

    if (textures.length === 0) return null;

    return (
        <pixiAnimatedSprite
            ref={spriteRef}
            textures={getTextures()}
            animationSpeed={0.2}
            loop={animState !== 'prerun'}
            x={600} y={460}
            anchor={0.5}
            scale={0.4}
        />
    )
}