import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { FaPowerOff, FaCode, FaMicrochip, FaLayerGroup } from "react-icons/fa";
import profileImg from "../assets/profile.png";

// ─────────────────────────────────────────────────────────────────────────────
// WARP TRANSITION
// ─────────────────────────────────────────────────────────────────────────────
function WarpTransition({ onDone }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const W = (canvas.width = window.innerWidth);
        const H = (canvas.height = window.innerHeight);
        const CX = W / 2, CY = H / 2;
        const streaks = Array.from({ length: 200 }, () => ({
            angle: Math.random() * Math.PI * 2,
            startDist: 10 + Math.random() * 60,
            speed: 5 + Math.random() * 18,
            length: 8 + Math.random() * 28,
            width: 0.6 + Math.random() * 1.6,
            isRed: Math.random() > 0.3,
        }));
        const rings = [
            { t: 0.0, color: "rgba(220,38,38,0.95)", maxR: Math.hypot(W, H) * 1.1, width: 5 },
            { t: 0.1, color: "rgba(255,60,60,0.7)", maxR: Math.hypot(W, H) * 1.3, width: 3 },
            { t: 0.2, color: "rgba(255,255,255,0.35)", maxR: Math.hypot(W, H) * 1.5, width: 1.5 },
        ];
        let t = 0;
        const DURATION = 1.6;
        let raf;
        const draw = () => {
            t += 0.016;
            const p = Math.min(t / DURATION, 1);
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = `rgb(${Math.floor(4 + p * 28)},0,0)`;
            ctx.fillRect(0, 0, W, H);
            if (p < 0.9) {
                const wP = Math.min(p / 0.85, 1), acc = wP * wP * wP;
                streaks.forEach((s) => {
                    const d = s.startDist + acc * W * s.speed;
                    const e = d + s.length * (1 + acc * 12);
                    const x1 = CX + Math.cos(s.angle) * d, y1 = CY + Math.sin(s.angle) * d;
                    const x2 = CX + Math.cos(s.angle) * e, y2 = CY + Math.sin(s.angle) * e;
                    const g = ctx.createLinearGradient(x1, y1, x2, y2);
                    g.addColorStop(0, "rgba(0,0,0,0)");
                    g.addColorStop(0.4, s.isRed ? `rgba(220,38,38,${Math.min(wP * 5, 1)})` : `rgba(255,255,255,${Math.min(wP * 3, 0.7)})`);
                    g.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                    ctx.strokeStyle = g; ctx.lineWidth = s.width * (1 + wP * 3); ctx.stroke();
                });
            }
            rings.forEach((ring) => {
                if (p < ring.t) return;
                const rp = Math.min((p - ring.t) / 0.55, 1);
                const alpha = Math.max(0, 1 - rp * 1.6);
                ctx.beginPath(); ctx.arc(CX, CY, rp * rp * ring.maxR, 0, Math.PI * 2);
                ctx.strokeStyle = ring.color.replace(/[\d.]+\)$/, `${alpha})`);
                ctx.lineWidth = ring.width * (1 + rp * 4); ctx.stroke();
            });
            if (p > 0.7) {
                const fp = (p - 0.7) / 0.3;
                ctx.fillStyle = `rgba(255,255,255,${fp * fp})`; ctx.fillRect(0, 0, W, H);
            }
            if (t < DURATION) raf = requestAnimationFrame(draw);
            else onDone();
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);
    return <canvas ref={canvasRef} className="fixed inset-0 z-[10000] pointer-events-none" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER CANVAS — all GPU effects in one canvas (no React re-renders)
// ─────────────────────────────────────────────────────────────────────────────
const MasterCanvas = ({ burstRef }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);
        const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener("resize", onResize);

        // Mouse tracked via ref — NO state updates
        const mouse = { x: W / 2, y: H / 2 };
        const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        window.addEventListener("mousemove", onMove, { passive: true });

        // Particles — fewer, simpler
        const NUM = 55;
        const particles = Array.from({ length: NUM }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.4 + 0.4,
            red: Math.random() < 0.38,
            baseAlpha: Math.random() * 0.25 + 0.06,
            alpha: 0.1,
        }));

        // Burst particles
        const bursts = [];
        burstRef.current = (x, y) => {
            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 4;
                bursts.push({
                    x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                    life: 1, r: Math.random() * 2 + 0.6, red: Math.random() > 0.3,
                });
            }
        };

        const GRID = 65;
        const ATTRACT = 160;
        const CONNECT = 100;
        let tick = 0;
        let raf;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // ── Grid ───────────────────────────────────────────────────────
            ctx.lineWidth = 0.5;
            const offset = (tick * 0.1) % GRID;
            ctx.strokeStyle = "rgba(220,38,38,0.025)";
            for (let x = offset; x < W; x += GRID) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
            for (let y = offset; y < H; y += GRID) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

            // ── Scan lines ──────────────────────────────────────────────────
            const sg = ctx.createLinearGradient(0, mouse.y - 40, 0, mouse.y + 40);
            sg.addColorStop(0, "rgba(220,38,38,0)"); sg.addColorStop(0.5, "rgba(220,38,38,0.08)"); sg.addColorStop(1, "rgba(220,38,38,0)");
            ctx.fillStyle = sg; ctx.fillRect(0, mouse.y - 40, W, 80);
            const vg = ctx.createLinearGradient(mouse.x - 30, 0, mouse.x + 30, 0);
            vg.addColorStop(0, "rgba(220,38,38,0)"); vg.addColorStop(0.5, "rgba(220,38,38,0.06)"); vg.addColorStop(1, "rgba(220,38,38,0)");
            ctx.fillStyle = vg; ctx.fillRect(mouse.x - 30, 0, 60, H);

            // ── Particles ───────────────────────────────────────────────────
            particles.forEach(p => {
                const dx = mouse.x - p.x, dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ATTRACT && dist > 0.5) {
                    const f = ((ATTRACT - dist) / ATTRACT) * 0.035;
                    p.vx += (dx / dist) * f; p.vy += (dy / dist) * f;
                }
                p.vx *= 0.97; p.vy *= 0.97;
                p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
                const prox = dist < ATTRACT ? (1 - dist / ATTRACT) : 0;
                p.alpha = p.baseAlpha + prox * 0.45;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + prox * 0.8), 0, Math.PI * 2);
                ctx.fillStyle = p.red ? `rgba(220,38,38,${p.alpha})` : `rgba(255,255,255,${p.alpha * 0.45})`;
                ctx.fill();
            });

            // ── Connections (limit to nearby pairs only) ───────────────────
            ctx.lineWidth = 0.4;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < Math.min(i + 12, particles.length); j++) {
                    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < CONNECT) {
                        ctx.strokeStyle = `rgba(220,38,38,${0.06 * (1 - d / CONNECT)})`;
                        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
                    }
                }
            }

            // ── Burst particles ─────────────────────────────────────────────
            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i];
                b.x += b.vx; b.y += b.vy; b.vx *= 0.92; b.vy *= 0.92; b.life -= 0.03;
                if (b.life <= 0) { bursts.splice(i, 1); continue; }
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r * b.life, 0, Math.PI * 2);
                ctx.fillStyle = b.red ? `rgba(220,38,38,${b.life})` : `rgba(255,255,255,${b.life * 0.7})`;
                ctx.fill();
            }

            // ── Cursor dot ─────────────────────────────────────────────────
            ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(220,38,38,0.85)"; ctx.fill();
            ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(220,38,38,0.35)"; ctx.lineWidth = 1; ctx.stroke();

            tick++;
            raf = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMove);
        };
    }, [burstRef]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ cursor: "none" }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// GLITCH TEXT (periodic, low frequency)
// ─────────────────────────────────────────────────────────────────────────────
const GlitchText = ({ text, className = "" }) => {
    const [glitch, setGlitch] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setOffset({ x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 5 });
            setGlitch(true);
            setTimeout(() => setGlitch(false), 100);
        }, 3500 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <span className={`relative inline-block ${className}`}>
            {text}
            {glitch && (
                <>
                    <span className="absolute inset-0 text-red-500/60 pointer-events-none whitespace-pre-line"
                        style={{ transform: `translate(${offset.x}px,${offset.y}px)`, clipPath: "inset(15% 0 55% 0)" }}>{text}</span>
                    <span className="absolute inset-0 text-cyan-400/40 pointer-events-none whitespace-pre-line"
                        style={{ transform: `translate(${-offset.x * 0.5}px,${-offset.y}px)`, clipPath: "inset(60% 0 5% 0)" }}>{text}</span>
                </>
            )}
        </span>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const slides = [
    { tag: "// Full Stack Developer",    title: "CHELLA\nMUTHU\nKUMAR", subtitle: "Building seamless digital ecosystems", icon: FaCode },
    { tag: "// IoT & Embedded Engineer", title: "AI\nENTHUSIAST",       subtitle: "Integrating intelligent systems",      icon: FaMicrochip },
    { tag: "// React · Flutter · Node",  title: "FULL\nSTACK\nDEV",     subtitle: "Crafting premium user experiences",   icon: FaLayerGroup },
];

function LiveClock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
    return <span>{time.toLocaleTimeString("en-US", { hour12: false })}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
const LandingPage = ({ onEnter }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showWarp,     setShowWarp]     = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const burstRef  = useRef(null);
    const holdTimer = useRef(null);
    const photoRef  = useRef(null);

    // Photo 3D tilt via direct DOM mutation (no re-renders)
    useEffect(() => {
        const onMove = (e) => {
            if (!photoRef.current) return;
            const rect = photoRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            const rx =  ((e.clientY - cy) / rect.height) * 18;
            const ry = -((e.clientX - cx) / rect.width)  * 18;
            photoRef.current.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        };
        const onLeave = () => {
            if (photoRef.current) photoRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);
        return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
    }, []);

    // Slide auto-rotate
    useEffect(() => {
        const iv = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 4500);
        return () => clearInterval(iv);
    }, []);

    // Keyboard shortcut
    useEffect(() => {
        const onKey = (e) => {
            if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); setShowWarp(true); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Click: particle burst only (no state ripples)
    const handleClick = useCallback((e) => {
        burstRef.current?.(e.clientX, e.clientY);
    }, []);

    const startHold = useCallback(() => {
        setHoldProgress(0);
        holdTimer.current = setInterval(() => {
            setHoldProgress(p => {
                if (p >= 100) { clearInterval(holdTimer.current); setShowWarp(true); return 100; }
                return p + 2;
            });
        }, 20);
    }, []);

    const stopHold = useCallback(() => { clearInterval(holdTimer.current); setHoldProgress(0); }, []);

    const slide = slides[currentSlide];

    return (
        <>
            {showWarp && <WarpTransition onDone={onEnter} />}

            <motion.div
                className="fixed inset-0 z-50 bg-[#030303] text-white overflow-hidden flex items-center justify-center font-orbitron"
                style={{ cursor: "none" }}
                exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.25 } }}
                onClick={handleClick}
            >
                {/* Single master canvas for ALL effects */}
                <MasterCanvas burstRef={burstRef} />

                {/* ── HUD: top-left ── */}
                <div className="absolute top-8 left-8 z-20 font-mono text-[9px] text-red-500/55 uppercase tracking-widest space-y-1.5 select-none pointer-events-none">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(220,38,38,0.8)] animate-pulse" />
                        SYSTEM ONLINE
                    </div>
                    <div className="text-white/20">TS: <LiveClock /></div>
                    <div className="text-white/15 mt-2 border-t border-white/6 pt-2">[SPACE] to enter</div>
                </div>

                {/* ── HUD: top-right ── */}
                <div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-right space-y-2 select-none">
                    <div className="text-red-500/50 uppercase tracking-widest">AUTH_V3.0.4</div>
                    <div className="flex gap-1.5 justify-end mt-2">
                        {slides.map((_, i) => (
                            <div key={i} onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                                className={`h-[2px] rounded-full cursor-pointer transition-all duration-400 ${
                                    i === currentSlide ? "w-10 bg-red-500 shadow-[0_0_5px_rgba(220,38,38,0.8)]" : "w-3 bg-white/15 hover:bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Main content ── */}
                <div className="relative z-30 w-full max-w-7xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* LEFT — slide text */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ x: -60, opacity: 0, filter: "blur(14px)" }}
                                animate={{ x: 0,   opacity: 1, filter: "blur(0px)"  }}
                                exit={{    x:  60, opacity: 0, filter: "blur(14px)" }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-7 h-px bg-red-500/60" />
                                    <span className="font-mono text-red-500/65 text-xs tracking-[0.28em] uppercase">{slide.tag}</span>
                                </div>

                                <h1 className="text-[clamp(3rem,9vw,7rem)] font-black leading-none tracking-tight mb-5 whitespace-pre-line relative select-none">
                                    <GlitchText text={slide.title} className="text-white" />
                                    <motion.span
                                        className="absolute inset-0 text-red-500 blur-3xl opacity-[0.12] pointer-events-none whitespace-pre-line"
                                        animate={{ opacity: [0.07, 0.18, 0.07] }}
                                        transition={{ duration: 2.8, repeat: Infinity }}
                                    >{slide.title}</motion.span>
                                </h1>

                                <p className="text-white/28 text-sm md:text-base font-light tracking-[0.38em] uppercase mb-7">
                                    {slide.subtitle}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {["React", "Flutter", "IoT", "AI Agents", "Node.js"].map(tag => (
                                        <motion.span key={tag}
                                            whileHover={{ scale: 1.1, borderColor: "rgba(220,38,38,0.55)" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => { e.stopPropagation(); burstRef.current?.(e.clientX, e.clientY); }}
                                            className="text-[10px] font-mono text-white/22 border border-white/10 px-3 py-1 rounded-full cursor-pointer"
                                        >{tag}</motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT — photo + button */}
                    <div className="flex flex-col items-center gap-10 shrink-0">

                        {/* 3D tilt photo (tilt via direct DOM, no state) */}
                        <div style={{ perspective: "700px" }}>
                            <div ref={photoRef} style={{ transition: "transform 0.18s ease", willChange: "transform" }} className="relative">
                                <div className="absolute -inset-5 rounded-full border border-red-500/18"
                                    style={{ animation: "spin 14s linear infinite" }} />
                                <div className="absolute -inset-10 rounded-full border border-red-500/08"
                                    style={{ animation: "spin 24s linear infinite reverse" }} />
                                <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-red-500/30
                                    shadow-[0_0_45px_rgba(220,38,38,0.25)] relative">
                                    <img src={profileImg} alt="Chella Muthu Kumar"
                                        className="w-full h-full object-cover object-top"
                                        style={{ filter: "brightness(1.12) contrast(1.05)" }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                </div>
                                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/80 border border-white/10 rounded-full px-2.5 py-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.7)] animate-pulse" />
                                    <span className="text-[8px] font-mono text-white/45 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* HOLD BUTTON */}
                        <div className="group relative" onClick={e => e.stopPropagation()}>
                            <motion.div className="absolute -inset-8 rounded-full border border-red-500/12"
                                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                            <motion.div className="absolute -inset-14 rounded-full border border-red-500/06"
                                animate={{ rotate: -360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} />

                            <button
                                onMouseDown={startHold} onMouseUp={stopHold}
                                onMouseLeave={stopHold} onTouchStart={startHold} onTouchEnd={stopHold}
                                className="relative w-32 h-32 flex flex-col items-center justify-center rounded-full
                                    border border-white/8 bg-black/50 backdrop-blur-xl
                                    hover:border-red-500/45 transition-colors duration-300"
                                style={{ boxShadow: holdProgress > 0 ? "0 0 30px rgba(220,38,38,0.35)" : "none" }}
                            >
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(220,38,38,0.9)" strokeWidth="2.5"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 301.6,
                                            strokeDashoffset: 301.6 - (301.6 * holdProgress) / 100,
                                            filter: holdProgress > 0 ? "drop-shadow(0 0 4px rgba(220,38,38,0.8))" : "none",
                                            transition: "stroke-dashoffset 0.05s linear",
                                        }}
                                    />
                                </svg>
                                <FaPowerOff className={`text-3xl transition-all duration-200 ${holdProgress > 0 ? "text-red-500 scale-125" : "text-white/22 group-hover:text-red-500/55"}`}
                                    style={holdProgress > 0 ? { filter: "drop-shadow(0 0 6px rgba(220,38,38,0.9))" } : {}} />
                                <span className={`mt-2 text-[8px] font-mono tracking-[0.22em] uppercase ${holdProgress > 0 ? "text-red-400" : "text-white/28 group-hover:text-white/55"}`}>
                                    {holdProgress > 0 ? `${holdProgress}%` : "Hold"}
                                </span>
                            </button>

                            {holdProgress > 0 && (
                                <motion.div className="absolute inset-0 rounded-full bg-red-600 blur-[50px] z-[-1]"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: holdProgress / 130, scale: 1 + holdProgress / 90 }}
                                    transition={{ duration: 0.07 }}
                                />
                            )}
                        </div>

                        <motion.p animate={{ opacity: [0.22, 0.5, 0.22] }} transition={{ duration: 2.5, repeat: Infinity }}
                            className="text-[8px] font-mono text-white/28 tracking-[0.32em] uppercase text-center select-none">
                            Hold · or press [Space]
                        </motion.p>
                    </div>
                </div>

                {/* ── Corner brackets ── */}
                <div className="absolute inset-0 pointer-events-none">
                    {[
                        "top-14 left-14 border-t-2 border-l-2",
                        "top-14 right-14 border-t-2 border-r-2",
                        "bottom-14 left-14 border-b-2 border-l-2",
                        "bottom-14 right-14 border-b-2 border-r-2",
                    ].map((cls, i) => (
                        <motion.div key={i} className={`absolute w-7 h-7 border-red-500/30 ${cls}`}
                            animate={{ opacity: [0.3, 0.85, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }} />
                    ))}
                </div>

                {/* ── Bottom branding ── */}
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 select-none pointer-events-none">
                    <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                            <motion.div key={i} className="w-1 h-1 rounded-full bg-red-500/35"
                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.28 }} />
                        ))}
                    </div>
                    <div className="text-[8px] font-mono text-white/10 tracking-[0.4em] uppercase">Portfolio 2025</div>
                </div>
            </motion.div>
        </>
    );
};

export default LandingPage;
