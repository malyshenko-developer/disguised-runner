import {Application} from "@pixi/react";
import {TextStyle} from "pixi.js";

import {Hero} from "./Hero.tsx";
import {ParallaxBg} from "./ParallaxBg.tsx";

export const GameCanvas = () => {
    return (
        <Application width={1200} height={600} className="border-2 border-[#596E84] rounded">
            <ParallaxBg />

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