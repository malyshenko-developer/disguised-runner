import { useGameStore } from "../../store/game.ts";
import { useEffect, useRef, useState } from "react";
import { useTick } from "@pixi/react";

const HERO_Y_BASE = 470;

interface UseHeroPhysicsReturn {
    heroY: number;
    jumpState: "ground" | "up" | "down";
    prerunCompleted: () => void;
}

export const useHeroPhysics = (
    running: boolean,
    setAnimState: (state: "idle" | "prerun" | "run") => void
): UseHeroPhysicsReturn => {
    const updateHeroY = useGameStore(state => state.updateHeroY);

    const [heroY, setHeroY] = useState(HERO_Y_BASE);
    const [jumpState, setJumpState] = useState<"ground" | "up" | "down">("ground");
    const landingGrace = useRef(0);
    const canJump = useRef(true);
    const physics = useRef({ y: HERO_Y_BASE, vy: 0, grounded: true });

    const handleJump = (e: KeyboardEvent) => {
        if (e.code === "Space" && physics.current.grounded && canJump.current && running) {
            physics.current.vy = -460;
            physics.current.grounded = false;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleJump);
        return () => window.removeEventListener("keydown", handleJump);
    }, [running]);

    useTick((ticker) => {
        if (!running) return;

        const dt = ticker.deltaMS / 1000;

        if (landingGrace.current > 0) {
            landingGrace.current -= ticker.deltaMS;
            if (landingGrace.current <= 0) {
                setAnimState("prerun");
                setJumpState("ground");
            }
            return;
        }

        if (physics.current.grounded) {
            if (jumpState !== "ground") setJumpState("ground");
            return;
        }

        physics.current.vy += 800 * dt;
        physics.current.y += physics.current.vy * dt;
        setHeroY(physics.current.y);
        updateHeroY(physics.current.y);

        if (jumpState === "ground") {
            setJumpState("up");
        } else if (jumpState === "up" && physics.current.vy >= 0) {
            setJumpState("down");
        }

        if (physics.current.y >= HERO_Y_BASE) {
            physics.current.y = HERO_Y_BASE;
            physics.current.vy = 0;
            physics.current.grounded = true;
            setHeroY(HERO_Y_BASE);
            updateHeroY(HERO_Y_BASE);
            landingGrace.current = 400;
            canJump.current = false;
            setJumpState("down");
        }
    });

    useEffect(() => {
        if (running) {
            physics.current = { y: HERO_Y_BASE, vy: 0, grounded: true };
            setHeroY(HERO_Y_BASE);
            setJumpState("ground");
            landingGrace.current = 0;
            canJump.current = true;
            updateHeroY(HERO_Y_BASE);
            setAnimState("idle");
        }
    }, [running, setAnimState, updateHeroY]);

    useEffect(() => {
        if (!running) {
            physics.current = { y: HERO_Y_BASE, vy: 0, grounded: true };
            setHeroY(HERO_Y_BASE);
            setJumpState("ground");
            landingGrace.current = 0;
            canJump.current = true;
            updateHeroY(HERO_Y_BASE);
        }
    }, [running, updateHeroY]);

    const prerunCompleted = () => {
        canJump.current = true;
    };

    return { heroY, jumpState, prerunCompleted };
};