import { useCallback, useRef } from "react";
import { type Application, Graphics } from "pixi.js";
import { useTick } from "@pixi/react";

interface Particle {
  graphic: Graphics;
  vx: number;
  vy: number;
  life: number;
  initialLife: number;
}

export const useDustParticles = (app: Application) => {
  const particles = useRef<Particle[]>([]);

  const spawn = useCallback(
    (x: number, y: number) => {
      if (!app.stage) return;
      const count = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const graphic = new Graphics();
        const radius = 2 + Math.random() * 3;
        const alpha = 0.9;
        graphic.circle(0, 0, radius).fill({ color: 0x18402a, alpha });
        graphic.x = x + (Math.random() - 0.5) * 15;
        graphic.y = y + (Math.random() - 0.5) * 8;
        const vx = (Math.random() - 0.5) * 180;
        const vy = -Math.random() * 100 - 30;
        particles.current.push({ graphic, vx, vy, life: 1, initialLife: 0.5 });
        app.stage.addChild(graphic);
      }
    },
    [app],
  );

  useTick((ticker) => {
    const delta = ticker.deltaMS / 1000;
    for (let i = particles.current.length - 1; i >= 0; i--) {
      const p = particles.current[i];
      p.life -= delta / p.initialLife;
      if (p.life <= 0) {
        p.graphic.destroy();
        particles.current.splice(i, 1);
        continue;
      }
      p.graphic.x += p.vx * delta;
      p.graphic.y += p.vy * delta;
      p.vy += 400 * delta;
      const newAlpha = p.life * 0.9;
      p.graphic.clear();
      const radius = 2 + (1 - p.life) * 2;
      p.graphic.circle(0, 0, radius).fill({ color: 0x18402a, alpha: newAlpha });
    }
  });

  return spawn;
};
