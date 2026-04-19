import {useEffect, useState} from "react";
import { Assets, Texture} from "pixi.js";

export const Hero = () => {
    const [textures, setTextures] = useState<Texture[]>([]);

    useEffect(() => {
        if (textures.length === 0) {
            const promises = []
            for (let i = 1; i <= 24; i++) {
                const padded = i.toString().padStart(5, "0")

                promises.push(Assets.load(`/sprites/disguised/idle/idle_${padded}.png`))
            }

            Promise.all(promises).then(setTextures)
        }
    }, [textures.length]);

    if (textures.length === 0) return null;

    return (
        <pixiAnimatedSprite ref={(ref) => ref?.play()} textures={textures} autoPlay animationSpeed={0.2} loop x={600} y={460} anchor={0.5} scale={0.4} />
    )
}