import {useEffect, useState} from "react";
import { Assets, Texture } from "pixi.js";

interface PlayButtonProps {
    running: boolean;
    onToggle: () => void;
}

export const PlayButton = ({running, onToggle}: PlayButtonProps) => {
    const [texture, setTexture] = useState<Texture | null>(null);

    useEffect(() => {
        Assets.load("/sprites/ui/play.png").then(setTexture);
    }, []);

    if (!texture || running) return null;

    return (
        <pixiSprite
            texture={texture}
            x={600} y={180}
            anchor={0.5}
            width={102} height={102}
            eventMode="static"
            cursor="pointer"
            onPointerDown={onToggle}
        />
    );
};