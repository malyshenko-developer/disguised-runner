import {useEffect, useState} from "react";
import {Application} from "@pixi/react";
import {Assets, TextStyle, Texture} from "pixi.js";
import {Hero} from "./Hero.tsx";

export const GameCanvas = () => {
    const [textures, setTextures] = useState<{ [key: string]: Texture }>({});

    const layerOrder = [
        'Layer_0011_0', 'Layer_0010_1', 'Layer_0009_2', 'Layer_0008_3',
        'Layer_0007_Lights', 'Layer_0006_4', 'Layer_0005_5', 'Layer_0004_Lights',
        'Layer_0003_6', 'Layer_0002_7', 'Layer_0001_8', 'Layer_0000_9'
    ];

    useEffect(() => {
        layerOrder.forEach(name => {
            Assets.load(`/sprites/background/${name}.png`).then(texture => {
                setTextures(prev => ({ ...prev, [name]: texture }));
            });
        });
    }, []);

    return (
        <Application width={1200} height={600} className="border-2 border-[#596E84] rounded">
            {layerOrder.map((name) => {
                const texture = textures[name];
                if (!texture) return null;

                return (
                    <pixiTilingSprite
                        key={name}
                        texture={texture}
                        tilePosition={{ x: 0, y: 620 }}
                        width={1200}
                        height={600}
                        tileScale={{ x: 1, y: 1 }}
                    />
                );
            })}

            <pixiText
                text="DISGUISED RUNNER"
                anchor={{ x: 0.5, y: 0.5 }}
                x={600}
                y={225}
                style={new TextStyle({
                    fontFamily: 'Arial Black, Impact',
                    fontSize: 48,
                    fill: 0xE8F4FD,
                    stroke: 0x1A2336,
                    dropShadow: true,
                })}
            />

            <Hero />
        </Application>
    )};