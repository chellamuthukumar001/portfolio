import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaPowerOff } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────
// RESTORED: WARP TRANSITION (The requested hyperspace effect)
// ─────────────────────────────────────────────────────────────
function WarpTransition({ onDone }) {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const W = (canvas.width = window.innerWidth);
        const H = (canvas.height = window.innerHeight);
        const CX = W / 2;
        const CY = H / 2;

        const NUM_STREAKS = 250;
        const streaks = Array.from({ length: NUM_STREAKS }, () => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 20 + Math.random() * 80;
            return {
                angle,
                startDist: dist,
                speed: 4 + Math.random() * 18,
                length: 6 + Math.random() * 28,
                width: 0.8 + Math.random() * 2,
                isRed: Math.random() > 0.3,
            };
        });

        const rings = [
            { t: 0.0, color: "rgba(220,38,38,0.9)", maxR: Math.hypot(W, H) * 1.0, width: 4 },
            { t: 0.1, color: "rgba(255,50,50,0.7)", maxR: Math.hypot(W, H) * 1.2, width: 2 },
            { t: 0.2, color: "rgba(255,255,255,0.4)", maxR: Math.hypot(W, H) * 1.5, width: 1 },
        ];

        let t = 0;
        const DURATION = 1.6;

        const draw = () => {
            t += 0.016;
            const p = Math.min(t / DURATION, 1);
            ctx.clearRect(0, 0, W, H);

            // Deep background
            ctx.fillStyle = `rgb(${Math.floor(10 + p * 40)}, 0, 0)`;
            ctx.fillRect(0, 0, W, H);

            if (p < 0.9) {
                const warpP = Math.min(p / 0.85, 1);
                const accel = warpP * warpP * warpP;

                streaks.forEach((s) => {
                    const dist = s.startDist + accel * W * s.speed;
                    const endDist = dist + s.length * (1 + accel * 10);
                    const x1 = CX + Math.cos(s.angle) * dist;
                    const y1 = CY + Math.sin(s.angle) * dist;
                    const x2 = CX + Math.cos(s.angle) * endDist;
                    const y2 = CY + Math.sin(s.angle) * endDist;

                    const alpha = Math.min(warpP * 4, 1);
                    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
                    grad.addColorStop(0, "rgba(0,0,0,0)");
                    grad.addColorStop(0.5, s.isRed ? `rgba(220,38,38,${alpha})` : `rgba(255,255,255,${alpha})`);
                    grad.addColorStop(1, "rgba(255,255,255,0)");

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = s.width * (1 + warpP * 3);
                    ctx.stroke();
                });
            }

            rings.forEach((ring) => {
                if (p < ring.t) return;
                const rp = Math.min((p - ring.t) / 0.6, 1);
                const radius = rp * rp * ring.maxR;
                const alpha = Math.max(0, 1 - rp * 1.5);

                ctx.beginPath();
                ctx.arc(CX, CY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = ring.color.replace(/[\d.]+\)$/, `${alpha})`);
                ctx.lineWidth = ring.width * (1 + rp * 4);
                ctx.stroke();
            });

            if (p > 0.7) {
                const fp = (p - 0.7) / 0.3;
                ctx.fillStyle = `rgba(255,255,255,${fp * fp})`;
                ctx.fillRect(0, 0, W, H);
            }

            if (t < DURATION) {
                rafRef.current = requestAnimationFrame(draw);
            } else {
                onDone();
            }
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafRef.current);
    }, [onDone]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[10000] pointer-events-none" />;
}

// ─────────────────────────────────────────────────────────────
// UNIQUE: MESH DISTORTION BACKGROUND
// ─────────────────────────────────────────────────────────────
const InteractiveMesh = ({ mousePos }) => {
    const ROWS = 20;
    const COLS = 20;

    return (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-transform duration-700 ease-out"
            style={{ perspective: "1000px" }}>
            <div className="grid w-full h-full"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    transform: `rotateX(${mousePos.y * 10}deg) rotateY(${-mousePos.x * 10}deg) scale(1.1)`
                }}>
                {Array.from({ length: ROWS * COLS }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-red-500/30" />
                ))}
            </div>
        </div>
    );
};

const slides = [
    { title: "CHELLA MUTHU KUMAR", subtitle: "SYNCHRONIZING DIGITAL ARCHITECTURES" },
    { title: "AI ENTHUSIAST", subtitle: "INTEGRATING INTELLIGENT SYSTEMS" },
    { title: "FULL STACK DEV", subtitle: "BUILDING SEAMLESS ECOSYSTEMS" },
];

const LandingPage = ({ onEnter }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showWarp, setShowWarp] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimer = useRef(null);

    useEffect(() => {
        const handleMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
                rawX: e.clientX,
                rawY: e.clientY
            });
        };
        window.addEventListener("mousemove", handleMove);
        const internVal = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4500);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            clearInterval(internVal);
        };
    }, []);

    const startHold = () => {
        setHoldProgress(0);
        holdTimer.current = setInterval(() => {
            setHoldProgress(p => {
                if (p >= 100) {
                    clearInterval(holdTimer.current);
                    setShowWarp(true);
                    return 100;
                }
                return p + 2;
            });
        }, 20);
    };

    const stopHold = () => {
        clearInterval(holdTimer.current);
        setHoldProgress(0);
    };

    return (
        <>
            {showWarp && <WarpTransition onDone={onEnter} />}

            <motion.div
                className="fixed inset-0 z-50 bg-[#020202] text-white overflow-hidden cursor-crosshair flex flex-col items-center justify-center font-orbitron"
                exit={{ opacity: 0 }}
            >
                <InteractiveMesh mousePos={mousePos} />

                {/* Floating Scanning Line */}
                <motion.div
                    animate={{ x: mousePos.rawX }}
                    className="absolute top-0 bottom-0 w-[1px] bg-red-500/20 z-10 pointer-events-none"
                    style={{ transition: "none" }}
                />

                {/* Tech Dashboard UI */}
                <div className="absolute top-10 left-10 z-20 font-mono text-[9px] text-red-500/60 uppercase tracking-widest space-y-2">
                    <div className="flex gap-2 items-center">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        SYSTEM STATUS: ACTIVE
                    </div>
                    <div>LATENCY: {(Math.random() * 0.5 + 0.1).toFixed(3)}ms</div>
                    <div>COORDS: [{mousePos.rawX}, {mousePos.rawY}]</div>
                </div>

                <div className="absolute bottom-10 right-10 z-20 text-right opacity-40">
                    <div className="font-mono text-[8px] tracking-[0.4em] mb-4">AUTHENTICATION_V3.0.4</div>
                    <div className="flex gap-1 justify-end">
                        {slides.map((_, i) => (
                            <div key={i} className={`h-[2px] rounded-full transition-all duration-500 ${i === currentSlide ? "w-10 bg-red-600" : "w-2 bg-white/20"}`} />
                        ))}
                    </div>
                </div>

                {/* Main Content Hub */}
                <div className="relative z-30 flex flex-col items-center max-w-7xl w-full px-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ x: -100, opacity: 0, filter: "blur(20px)" }}
                            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ x: 100, opacity: 0, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <h2 className="text-red-500 font-mono text-xs tracking-[0.6em] mb-4">ESTABLISHING LINK...</h2>
                            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 relative">
                                <span className="relative z-10">{slides[currentSlide].title}</span>
                                <motion.span
                                    className="absolute inset-0 text-red-500 opacity-20 blur-2xl"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {slides[currentSlide].title}
                                </motion.span>
                            </h1>
                            <p className="text-white/30 text-sm md:text-xl font-light tracking-[0.5em] mb-20">
                                {slides[currentSlide].subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* INTERACTIVE HOLD TRIGGER */}
                    <div className="group relative">
                        <motion.div
                            className="absolute -inset-10 border border-red-500/10 rounded-full scale-150 rotate-45 group-hover:scale-100 transition-all duration-1000 opacity-0 group-hover:opacity-100"
                        />

                        <button
                            onMouseDown={startHold}
                            onMouseUp={stopHold}
                            onMouseLeave={stopHold}
                            onTouchStart={startHold}
                            onTouchEnd={stopHold}
                            className="relative w-40 h-40 flex flex-col items-center justify-center rounded-full border border-white/5 bg-black/40 backdrop-blur-xl group hover:border-red-500/50 transition-all duration-500"
                        >
                            {/* Circular Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="80" cy="80" r="78"
                                    className="fill-none stroke-red-500/10 stroke-1"
                                />
                                <motion.circle
                                    cx="80" cy="80" r="78"
                                    className="fill-none stroke-red-600 stroke-[3px]"
                                    style={{
                                        strokeDasharray: 490,
                                        strokeDashoffset: 490 - (490 * holdProgress) / 100
                                    }}
                                />
                            </svg>

                            <FaPowerOff className={`text-4xl transition-all duration-300 ${holdProgress > 0 ? "text-red-600 scale-125" : "text-white/20 group-hover:text-red-500/60"}`} />
                            <span className="mt-4 text-[9px] font-mono tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
                                {holdProgress > 0 ? `${holdProgress}%` : "Hold to Start"}
                            </span>
                        </button>

                        {/* Distortion ripples during hold */}
                        {holdProgress > 0 && (
                            <motion.div
                                className="absolute inset-0 bg-red-600 rounded-full blur-[80px] z-[-1]"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: holdProgress / 100, scale: holdProgress / 20 }}
                                transition={{ duration: 0.1 }}
                            />
                        )}
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <div className="absolute top-20 left-20 border-t border-l border-red-500 w-10 h-10" />
                    <div className="absolute top-20 right-20 border-t border-r border-red-500 w-10 h-10" />
                    <div className="absolute bottom-20 left-20 border-b border-l border-red-500 w-10 h-10" />
                    <div className="absolute bottom-20 right-20 border-b border-r border-red-500 w-10 h-10" />
                </div>
            </motion.div>
        </>
    );
};

export default LandingPage;
