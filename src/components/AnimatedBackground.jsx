import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animRef  = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        let resizeTimer;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                W = canvas.width  = window.innerWidth;
                H = canvas.height = window.innerHeight;
                // Rebuild cached vignette on resize
                vignetteCache = null;
            }, 150);
        };
        window.addEventListener('resize', onResize);

        // â”€â”€ Particles â€” reduced to 60 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const NUM = 60;
        const particles = Array.from({ length: NUM }, () => {
            const isRed = Math.random() < 0.35;
            return {
                x:     Math.random() * W,
                y:     Math.random() * H,
                r:     Math.random() * 1.6 + 0.4,
                dx:    (Math.random() - 0.5) * 0.22,
                dy:    (Math.random() - 0.5) * 0.22,
                alpha: Math.random() * 0.4 + 0.08,
                isRed,
                alphaOffset: Math.random() * Math.PI * 2, // for pulsing
            };
        });

        const GRID   = 70;
        const CONNECT_DIST = 120;
        const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
        let tick = 0;

        // Pre-cache vignette gradient â€” only recreate on resize
        let vignetteCache = null;
        const getVignette = () => {
            if (!vignetteCache) {
                vignetteCache = ctx.createRadialGradient(W / 2, H / 2, H * 0.08, W / 2, H / 2, H * 0.85);
                vignetteCache.addColorStop(0, 'rgba(0,0,0,0)');
                vignetteCache.addColorStop(1, 'rgba(0,0,0,0.55)');
            }
            return vignetteCache;
        };

        // Pre-cache scan line â€” recreate each frame is cheap (linear only)
        const SCAN_SPEED = 0.3;

        // Grid color strings â€” pre-built to avoid string allocation each frame
        const GRID_COLOR_V = 'rgba(0,170,255,0.022)';
        const GRID_COLOR_H = 'rgba(0,170,255,0.016)';

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // â”€â”€ Scrolling grid (static color â€” no per-line sin()) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            ctx.lineWidth = 0.5;
            const offset = (tick * 0.12) % GRID;

            ctx.strokeStyle = GRID_COLOR_V;
            ctx.beginPath();
            for (let x = -GRID + offset; x < W + GRID; x += GRID) {
                ctx.moveTo(x, 0); ctx.lineTo(x, H);
            }
            ctx.stroke();

            ctx.strokeStyle = GRID_COLOR_H;
            ctx.beginPath();
            for (let y = -GRID + offset; y < H + GRID; y += GRID) {
                ctx.moveTo(0, y); ctx.lineTo(W, y);
            }
            ctx.stroke();

            // â”€â”€ Particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            for (let i = 0; i < NUM; i++) {
                const p = particles[i];
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                // Pulsing alpha â€” use stored offset per particle (avoid tick*0.025+x*0.01 per frame)
                p.alpha = 0.10 + 0.08 * Math.sin(tick * 0.022 + p.alphaOffset);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.isRed
                    ? `rgba(0,170,255,${p.alpha.toFixed(2)})`
                    : `rgba(255,255,255,${(p.alpha * 0.4).toFixed(2)})`;
                ctx.fill();
            }

            // â”€â”€ Connect nearby particles â€” O(n*12) instead of O(nÂ²) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            ctx.lineWidth = 0.45;
            for (let i = 0; i < NUM; i++) {
                // Only check the next 15 particles (sliding window) to avoid full O(nÂ²)
                const limit = Math.min(i + 15, NUM);
                for (let j = i + 1; j < limit; j++) {
                    const dx   = particles[i].x - particles[j].x;
                    const dy   = particles[i].y - particles[j].y;
                    const dist2 = dx * dx + dy * dy;
                    if (dist2 < CONNECT_DIST_SQ) {
                        const dist = Math.sqrt(dist2);
                        const alpha  = 0.07 * (1 - dist / CONNECT_DIST);
                        const bothRed = particles[i].isRed && particles[j].isRed;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = bothRed
                            ? `rgba(0,170,255,${(alpha * 1.3).toFixed(3)})`
                            : `rgba(200,200,200,${(alpha * 0.45).toFixed(3)})`;
                        ctx.stroke();
                    }
                }
            }

            // â”€â”€ Radial vignette (cached) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            ctx.fillStyle = getVignette();
            ctx.fillRect(0, 0, W, H);

            // â”€â”€ Slow scan line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            const scanY = (tick * SCAN_SPEED) % H;
            const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
            scanGrad.addColorStop(0,   'rgba(0,170,255,0)');
            scanGrad.addColorStop(0.5, 'rgba(0,170,255,0.028)');
            scanGrad.addColorStop(1,   'rgba(0,170,255,0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 40, W, 80);

            // â”€â”€ Central warm glow â€” only every 2 frames â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            if (tick % 2 === 0) {
                const glowAlpha = 0.035 + 0.015 * Math.sin(tick * 0.012);
                const centerGlow = ctx.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, W * 0.4);
                centerGlow.addColorStop(0, `rgba(180,20,20,${glowAlpha.toFixed(3)})`);
                centerGlow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = centerGlow;
                ctx.fillRect(0, 0, W, H);
            }

            tick++;
            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ opacity: 1, zIndex: -5, willChange: 'contents' }}
        />
    );
};

export default AnimatedBackground;

