import { useEffect, useRef } from 'react';

const AnimatedBackground = ({ sectionColor = '#000000' }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);

        // Particles
        const NUM = 80;
        const particles = Array.from({ length: NUM }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        // Grid lines
        const GRID = 60;

        let tick = 0;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // ── Subtle animated grid ──────────────────────────────────
            ctx.strokeStyle = 'rgba(220,38,38,0.04)';
            ctx.lineWidth = 1;
            const offset = (tick * 0.2) % GRID;
            for (let x = -GRID + offset; x < W + GRID; x += GRID) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = -GRID + offset; y < H + GRID; y += GRID) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }

            // ── Floating particles ────────────────────────────────────
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                // Pulse alpha
                p.alpha = 0.12 + 0.08 * Math.sin(tick * 0.02 + p.x);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                // Mix red and dim-white particles
                const isRed = p.x % 3 < 2;
                ctx.fillStyle = isRed
                    ? `rgba(220,38,38,${p.alpha})`
                    : `rgba(255,255,255,${p.alpha * 0.5})`;
                ctx.fill();
            });

            // ── Connect nearby particles ──────────────────────────────
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(180,20,20,${0.07 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // ── Radial vignette ───────────────────────────────────────
            const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // ── Slow horizontal scan line ─────────────────────────────
            const scanY = (tick * 0.4) % H;
            const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
            scanGrad.addColorStop(0, 'rgba(220,38,38,0)');
            scanGrad.addColorStop(0.5, 'rgba(220,38,38,0.025)');
            scanGrad.addColorStop(1, 'rgba(220,38,38,0)');
            ctx.fillStyle = scanGrad;
            ctx.fillRect(0, scanY - 40, W, 80);

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
