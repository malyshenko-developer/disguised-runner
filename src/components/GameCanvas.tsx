import {useEffect, useState} from "react";
import {Application} from "@pixi/react";

import {Hero} from "./Hero.tsx";
import {ParallaxBg} from "./ParallaxBg.tsx";
import {PlayButton} from "./PlayButton.tsx";
import {Enemy} from "./Enemy.tsx";

interface EnemyData {
    id: number;
    initialX: number;
}

export const GameCanvas = () => {
    const [scrollX, setScrollX] = useState<number>(0);
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [enemies, setEnemies] = useState<EnemyData[]>([]);

    const spawnEnemy = () => {
        const id = Date.now();
        setEnemies(prev => [...prev, {id, initialX: 1400}]);
    };

    const toggleGame = () => setGameRunning(true);

    useEffect(() => {
        if (!gameRunning) return;

        spawnEnemy();

        const interval = setInterval(spawnEnemy, 3000);
        return () => clearInterval(interval);
    }, [gameRunning]);

    return (
        <Application width={1200} height={600} className="border-2 border-[#596E84] rounded">
            <ParallaxBg scrollX={scrollX} setScrollX={setScrollX} gameRunning={gameRunning} />

            {!gameRunning && (
                <PlayButton running={gameRunning} onToggle={toggleGame} />
            )}

            <Hero scrollX={scrollX} running={gameRunning} />

            {enemies.map(({id, initialX}) => (
                <Enemy
                    key={id}
                    initialX={initialX}
                    onDestroy={() => setEnemies(e => e.filter(enemy => enemy.id !== id))}
                />
            ))}
        </Application>
    )};