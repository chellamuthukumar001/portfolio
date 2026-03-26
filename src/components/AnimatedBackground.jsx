import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animRef  = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = canvas.width  = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const onResize = () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        // ── Particles ──────────────────────────────────────────────────────────
        const NUM = 110;
        const particles = Array.from({ length: NUM }, () => {
            const isRed = Math.random() < 0.35;
            return {
                x:     Math.random() * W,
                y:     Math.random() * H,
                r:     Math.random() * 1.8 + 0.4,
                dx:    (Math.random() - 0.5) * 0.28,
                dy:    (Math.random() - 0.5) * 0.28,
                alpha: Math.random() * 0.5 + 0.08,
                isRed,
                // trail history
                trail: [],
            };
        });

        const GRID   = 70;
        const CONNECT_DIST = 130;
        let tick = 0;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // ── Scrolling grid ───────────────────────────────────────────────
            ctx.lineWidth = 0.6;
            const offset = (tick * 0.15) % GRID;

            // Vertical lines
            for (let x = -GRID + offset; x < W + GRID; x += GRID) {
                const intensity = 0.025 + 0.01 * Math.sin(tick * 0.01 + x * 0.005);
                ctx.strokeStyle = `rgba(220,38,38,${intensity})`;
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            // Horizontal lines
            for (let y = -GRID + offset; y < H + GRID; y += GRID) {
                const intensity = 0.018 + 0.01 * Math.sin(tick * 0.01 + y * 0.005);
                ctx.strokeStyle = `rgba(220,38,38,${intensity})`;
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }

            // ── Particles + trails ───────────────────────────────────────────
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                // Pulsing alpha
                p.alpha = 0.12 + 0.10 * Math.sin(tick * 0.025 + p.x * 0.01);

                // Store trail
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 6) p.trail.shift();

                // Draw trail
                if (p.trail.length > 1 && p.isRed) {
                    for (let t = 1; t < p.trail.length; t++) {
                        const progress = t / p.trail.length;
                        ctx.beginPath();
                        ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
                        ctx.lineTo(p.trail[t].x, p.trail[t].y);
                        ctx.strokeStyle = `rgba(220,38,38,${p.alpha * progress * 0.4})`;
                        ctx.lineWidth = p.r * progress * 0.8;
                        ctx.stroke();
                    }
                }

                // Draw particle dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.isRed
                    ? `rgba(220,38,38,${p.alpha})`
                    : `rgba(255,255,255,${p.alpha * 0.45})`;
                ctx.fill();

                // Glow halo on red particles
                if (p.isRed && p.alpha > 0.18) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                    g.addColorStop(0, `rgba(220,38,38,${p.alpha * 0.15})`);
                    g.addColorStop(1, 'rgba(220,38,38,0)');
                    ctx.fillStyle = g;
                    ctx.fill();
                }
            });

            // ── Connect nearby particles ─────────────────────────────────────
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx   = particles[i].x - particles[j].x;
                    const dy   = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const alpha  = 0.08 * (1 - dist / CONNECT_DIST);
                        const bothRed = particles[i].isRed && particles[j].isRed;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = bothRed
                            ? `rgba(220,38,38,${alpha * 1.4})`
                            : `rgba(200,200,200,${alpha * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // ── Radial vignette ──────────────────────────────────────────────
            const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.08, W / 2, H / 2, H * 0.85);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, 'rgba(0,0,0,0.65)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // ── Slow scan line ───────────────────────────────────────────────
            const scanY    = (tick * 0.35) % H;
            const scanGrad = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
            scanGrad.addColorStop(0,   'rgba(220,38,38,0)');
            scanGrad.addColorStop(0.5, 'rgba(220,38,38,0.035)');
            scanGrad.addColorStop(1,   'rgba(220,38,38,0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 50, W, 100);

            // ── Central warm glow pulse ──────────────────────────────────────
            const glowAlpha = 0.04 + 0.02 * Math.sin(tick * 0.012);
            const centerGlow = ctx.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, W * 0.45);
            centerGlow.addColorStop(0, `rgba(180,20,20,${glowAlpha})`);
            centerGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = centerGlow;
            ctx.fillRect(0, 0, W, H);

            tick++;
            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ opacity: 1, zIndex: -5 }}
        />
    );
};

export default AnimatedBackground;
