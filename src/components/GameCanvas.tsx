import {Application} from "@pixi/react";
import {TextStyle} from "pixi.js";

export const GameCanvas = () => {
    return (
        <Application width={1200} height={600} backgroundColor={"#87CEEB"} className={"border-2 border-[#4682B4] rounded"}>
            {/*LINE OF GROUND*/}
            <pixiGraphics
                draw={(g) => {
                    g.clear()
                    g.setStrokeStyle({width: 4, color: 0xD2B48C})
                    g.moveTo(0, 550)
                    g.lineTo(1200, 550)
                    g.stroke()
                }}
            />

            {/*GROUND*/}
            <pixiGraphics
                draw={(g) => {
                    g.clear()
                    g.rect(0, 550, 1200, 50)
                    g.fill(0x6B8E23)
                }}
            />

            <pixiText
                text="DISGUISED RUNNER READY!"
                anchor={{ x: 0.5, y: 0.5 }}
                x={600}
                y={275}
                style={new TextStyle({
                    fontFamily: 'Arial Black',
                    fontSize: 52,
                    fill: 0xFFFFFF
                })}
            />
        </Application>
    )
}