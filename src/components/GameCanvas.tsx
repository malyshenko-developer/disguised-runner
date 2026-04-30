import { useEffect, useState } from "react";
import { Application, useTick } from "@pixi/react";
import { Hero } from "./Hero.tsx";
import { ParallaxBg } from "./ParallaxBg.tsx";
import { PlayButton } from "./PlayButton.tsx";
import { Enemy } from "./Enemy.tsx";
import { useGameStore } from "../store/game.ts";

const GameContent = () => {
    const { gameRunning, enemies, heroY, setGameOver, startGame, removeEnemy } = useGameStore();
    const [scrollX, setScrollX] = useState(0);

    useTick(() => {
        if (!gameRunning) return;
        if (enemies.length === 0) return;

        const heroHitbox = { width: 80, height: 100, offsetY: 20 };
        const heroLeft = 600 - heroHitbox.width / 2;
        const heroRight = 600 + heroHitbox.width / 2;
        const heroTop = heroY + heroHitbox.offsetY - heroHitbox.height / 2;
        const heroBottom = heroY + heroHitbox.offsetY + heroHitbox.height / 2;

        for (const enemy of enemies) {
            const enemyScale = 1.4;
            const spriteWidth = enemy.width * enemyScale;
            const spriteHeight = enemy.height * enemyScale;
            const hitboxScale = 0.5;
            const enemyOffsetY = 15;
            const hitboxWidth = spriteWidth * hitboxScale;
            const hitboxHeight = spriteHeight * hitboxScale;

            const enemyLeft = enemy.x - hitboxWidth / 2;
            const enemyRight = enemy.x + hitboxWidth / 2;
            const enemyTop = 520 + enemyOffsetY - hitboxHeight / 2;
            const enemyBottom = 520 + enemyOffsetY + hitboxHeight / 2;

            if (enemyRight > heroLeft && enemyLeft < heroRight &&
                enemyBottom > heroTop && enemyTop < heroBottom) {
                setGameOver();
                break;
            }
        }
    });

    const toggleGame = () => startGame();

    return (
        <>
            <ParallaxBg scrollX={scrollX} setScrollX={setScrollX} gameRunning={gameRunning} />
            {!gameRunning && <PlayButton running={gameRunning} onToggle={toggleGame} />}
            <Hero scrollX={scrollX} running={gameRunning} />
            {enemies.map(enemy => (
                <Enemy key={enemy.id} enemy={enemy} onDestroy={() => removeEnemy(enemy.id)} />
            ))}
        </>
    );
};

export const GameCanvas = () => {
    const { gameRunning, spawnEnemy } = useGameStore();

    useEffect(() => {
        if (!gameRunning) return;
        spawnEnemy();
        const id = setInterval(spawnEnemy, 3000);
        return () => clearInterval(id);
    }, [gameRunning, spawnEnemy]);

    return (
        <Application width={1200} height={600} className="border-2 border-[#596E84] rounded">
            <GameContent />
        </Application>
    );
};