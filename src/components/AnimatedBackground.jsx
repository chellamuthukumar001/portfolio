import { useEffect, useRef, memo } from 'react';

const AnimatedBackground = memo(() => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        // Use device pixel ratio for crisp rendering but cap it for performance
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let W, H;

        const resize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = `${W}px`;
            canvas.style.height = `${H}px`;
            ctx.scale(dpr, dpr);
        };
        resize();

        let resizeTimeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        };
        window.addEventListener('resize', onResize);

        // Reduced particle count for better performance
        const NUM = 45;
        const particles = Array.from({ length: NUM }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            isRed: Math.random() < 0.4,
            baseAlpha: Math.random() * 0.3 + 0.1,
        }));

        const GRID = 80;
        let tick = 0;
        let lastTime = 0;
        const targetFPS = 30; // Cap FPS for smoother experience
        const frameInterval = 1000 / targetFPS;

        const draw = (currentTime) => {
            animRef.current = requestAnimationFrame(draw);

            // Throttle to target FPS
            const delta = currentTime - lastTime;
            if (delta < frameInterval) return;
            lastTime = currentTime - (delta % frameInterval);

            ctx.clearRect(0, 0, W, H);

            // Simplified grid - fewer calculations
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba(220,38,38,0.025)';
            const offset = (tick * 0.1) % GRID;

            ctx.beginPath();
            for (let x = offset; x < W; x += GRID) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
            }
            for (let y = offset; y < H; y += GRID) {
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
            }
            ctx.stroke();

            // Particles - simplified rendering
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                const alpha = p.baseAlpha + 0.05 * Math.sin(tick * 0.02);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.isRed
                    ? `rgba(220,38,38,${alpha})`
                    : `rgba(255,255,255,${alpha * 0.4})`;
                ctx.fill();
            });

            // Limited connections - only check nearby particles (O(n) instead of O(n^2))
            ctx.lineWidth = 0.4;
            const CONNECT_DIST = 100;
            const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < CONNECT_DIST_SQ) {
                        const alpha = 0.06 * (1 - Math.sqrt(distSq) / CONNECT_DIST);
                        ctx.strokeStyle = `rgba(220,38,38,${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Simplified vignette - cached gradient
            if (!ctx._vignette || ctx._vignetteSize !== H) {
                ctx._vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.8);
                ctx._vignette.addColorStop(0, 'rgba(0,0,0,0)');
                ctx._vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
                ctx._vignetteSize = H;
            }
            ctx.fillStyle = ctx._vignette;
            ctx.fillRect(0, 0, W, H);

            // Subtle center glow
            const glowAlpha = 0.03 + 0.015 * Math.sin(tick * 0.01);
            const centerGlow = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, W * 0.4);
            centerGlow.addColorStop(0, `rgba(180,20,20,${glowAlpha})`);
            centerGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = centerGlow;
            ctx.fillRect(0, 0, W, H);

            tick++;
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none will-change-transform"
            style={{ opacity: 1, zIndex: -5 }}
        />
    );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
