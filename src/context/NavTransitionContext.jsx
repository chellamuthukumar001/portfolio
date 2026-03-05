import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavTransitionContext = createContext(null);
export function useNavTransition() { return useContext(NavTransitionContext); }

// ─── 1. Ripple Transition (The Classic) ───────────────────────────────────────
function RippleTransition({ origin, onMidpoint }) {
    const canvasRef = useRef(null);
    const startAnimation = (canvas) => {
        const ctx = canvas.getContext('2d');
        const W = canvas.width = window.innerWidth;
        const H = canvas.height = window.innerHeight;
        const maxR = Math.hypot(Math.max(origin.x, W - origin.x), Math.max(origin.y, H - origin.y)) * 1.05;
        let t = 0;
        let midFired = false;
        const draw = () => {
            t += 0.016;
            ctx.clearRect(0, 0, W, H);
            let radius = 0;
            if (t <= 0.4) {
                radius = (1 - Math.pow(1 - t / 0.4, 3)) * maxR;
            } else if (t <= 0.55) {
                radius = maxR;
                if (!midFired) { midFired = true; onMidpoint(); }
            } else {
                radius = (1 - Math.pow((t - 0.55) / 0.4, 2)) * maxR;
            }
            if (radius > 0) {
                ctx.beginPath(); ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(185, 28, 28, 1)'; ctx.fill();
            }
            if (t < 0.95) requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    };
    return <canvas ref={(el) => el && startAnimation(el)} className="fixed inset-0 z-[9000] pointer-events-none" />;
}

// ─── 2. Glitch Transition (Screen Slices) ─────────────────────────────────────
function GlitchTransition({ onMidpoint }) {
    const [done, setDone] = useState(false);
    return (
        <motion.div
            className="fixed inset-0 z-[9000] pointer-events-none overflow-hidden"
            onAnimationComplete={() => setDone(true)}
        >
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: i % 2 === 0 ? '-100%' : '100%' }}
                    animate={{ x: ['-100%', '0%', '0%', i % 2 === 0 ? '100%' : '-100%'] }}
                    transition={{ duration: 0.8, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }}
                    onUpdate={(latest) => { if (latest.x === '0%' && i === 5) onMidpoint(); }}
                    className="absolute w-full bg-red-800"
                    style={{ height: '10%', top: `${i * 10}%` }}
                />
            ))}
        </motion.div>
    );
}

// ─── 3. Warp Drive Transition (Star Streaks) ──────────────────────────────────
function WarpDriveTransition({ onMidpoint }) {
    const canvasRef = useRef(null);
    const startAnimation = (canvas) => {
        const ctx = canvas.getContext('2d');
        const W = canvas.width = window.innerWidth;
        const H = canvas.height = window.innerHeight;
        let t = 0; let midFired = false;
        const draw = () => {
            t += 0.016;
            ctx.fillStyle = 'black'; ctx.fillRect(0, 0, W, H);
            if (t > 0.4 && !midFired) { midFired = true; onMidpoint(); }
            // Simplified star warp
            for (let i = 0; i < 100; i++) {
                const angle = (i / 100) * Math.PI * 2;
                const speed = (i % 10) + 5;
                const dist = (t * speed * 200) % (W / 2);
                const x = W / 2 + Math.cos(angle) * dist;
                const y = H / 2 + Math.sin(angle) * dist;
                ctx.fillStyle = 'red'; ctx.fillRect(x, y, 2, 10);
            }
            if (t < 0.9) requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    };
    return <canvas ref={(el) => el && startAnimation(el)} className="fixed inset-0 z-[9000] pointer-events-none" />;
}

// ─── 4. Grid Transition (Mosaic blocks) ───────────────────────────────────────
function GridTransition({ onMidpoint }) {
    return (
        <div className="fixed inset-0 z-[9000] pointer-events-none grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1.1, 1.1, 0],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 1,
                        times: [0, 0.4, 0.6, 1],
                        delay: Math.random() * 0.3
                    }}
                    onUpdate={(latest) => { if (i === 50 && latest.scale > 1) onMidpoint(); }}
                    className="bg-red-700 border border-black/20"
                />
            ))}
        </div>
    );
}

// ─── 5. Flash Transition (Single Frame Explosion) ─────────────────────────────
function FlashTransition({ onMidpoint }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 0.7, 1] }}
            onUpdate={(latest) => { if (latest.opacity > 0.9) onMidpoint(); }}
            className="fixed inset-0 z-[9000] bg-white pointer-events-none"
        />
    );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function NavTransitionProvider({ children }) {
    const [phase, setPhase] = useState('idle');
    const [type, setType] = useState('ripple');
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    const handleMidpoint = useCallback((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, []);

    const navigateTo = useCallback((sectionId, clickEvent, transitionType = 'ripple') => {
        const x = clickEvent?.clientX ?? window.innerWidth / 2;
        const y = clickEvent?.clientY ?? window.innerHeight / 2;
        setOrigin({ x, y });
        setType(transitionType);
        setPhase('entering');

        window.__navMidpoint = () => handleMidpoint(sectionId);
        setTimeout(() => setPhase('idle'), 1100);
    }, [handleMidpoint]);

    return (
        <NavTransitionContext.Provider value={{ navigateTo }}>
            <AnimatePresence>
                {phase === 'entering' && (
                    <>
                        {type === 'ripple' && <RippleTransition origin={origin} onMidpoint={() => window.__navMidpoint?.()} />}
                        {type === 'glitch' && <GlitchTransition onMidpoint={() => window.__navMidpoint?.()} />}
                        {type === 'warp' && <WarpDriveTransition onMidpoint={() => window.__navMidpoint?.()} />}
                        {type === 'grid' && <GridTransition onMidpoint={() => window.__navMidpoint?.()} />}
                        {type === 'flash' && <FlashTransition onMidpoint={() => window.__navMidpoint?.()} />}
                    </>
                )}
            </AnimatePresence>
            {children}
        </NavTransitionContext.Provider>
    );
}
