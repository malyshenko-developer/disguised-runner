import {useEffect, useRef, useState} from "react";
import {type AnimatedSprite, Assets, Rectangle, Texture} from "pixi.js";
import {useTick} from "@pixi/react";

interface EnemyProps {
    initialX: number
    onDestroy: () => void
}

export const Enemy = ({initialX, onDestroy}: EnemyProps) => {
    const [textures, setTextures] = useState<Texture[]>([])
    const spriteRef = useRef<AnimatedSprite>(null)

    const speed = 200
    const [enemyX, setEnemyX] = useState(initialX)

    useEffect(() => {
        const promises = [];
        for (let i = 0; i < 8; i++) {
            promises.push(
                Assets.load('/sprites/enemies/mushroom/mushroom.png')
                    .then((texture) => {
                        const frame = new Rectangle(i * 80, 0, 80, 64);
                        return new Texture({source: texture, frame});
                    })
            );
        }
        Promise.all(promises).then(setTextures);
    }, []);

    useTick((ticker) => {
        const dt = ticker.deltaMS / 1000
        const newX = enemyX - speed * dt
        setEnemyX(newX)

        if (newX < -100) {
            onDestroy()
        }
    })

    useEffect(() => {
        spriteRef.current?.play();
    }, [textures.length]);

    if (textures.length === 0) return null;

    return (
        <pixiAnimatedSprite ref={spriteRef} textures={textures} animationSpeed={0.25} loop x={enemyX} y={520} anchor={0.5} scale={1.4} />
    )
}