import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroData, socialLinks } from "../constants";
import { FaArrowRight, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";
import { ParallaxBackground } from "./ParallaxBackground";

const ROLES = ["React Developer", "IoT & Embedded Engineer", "Flutter Specialist", "Full Stack Dev"];

// Animated typewriter
function Typewriter() {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [speed, setSpeed] = useState(80);

    useEffect(() => {
        const word = ROLES[idx % ROLES.length];
        const t = setTimeout(() => {
            if (!deleting) {
                setText(word.substring(0, text.length + 1));
                setSpeed(80);
                if (text === word) setTimeout(() => setDeleting(true), 1600);
            } else {
                setText(word.substring(0, text.length - 1));
                setSpeed(35);
                if (text === "") {
                    setDeleting(false);
                    setIdx(i => i + 1);
                }
            }
        }, speed);
        return () => clearTimeout(t);
    }, [text, deleting, idx, speed]);

    return (
        <span className="inline-flex items-center gap-1">
            <span className="text-red-400 font-semibold">{text}</span>
            <span className="w-[2px] h-6 md:h-8 bg-red-400 animate-blink inline-block" />
        </span>
    );
}

const Hero = ({ onReset }) => {
    return (
        <ParallaxBackground intensity={25}>
            <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden">

            {/* ── Rich background: radial glow at center ── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(220,38,38,0.12) 0%, rgba(0,0,0,0) 70%)',
                }}
            />

            {/* ── Animated rings — pure CSS compositor ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {[
                    { size: 750, duration: '40s', dir: 'normal', opacity: '0.07' },
                    { size: 540, duration: '28s', dir: 'reverse', opacity: '0.10' },
                    { size: 360, duration: '18s', dir: 'normal', opacity: '0.12' },
                ].map(({ size, duration, dir, opacity }) => (
                    <div
                        key={size}
                        className="absolute rounded-full border border-red-500"
                        style={{
                            width: size,
                            height: size,
                            opacity,
                            animation: `spin ${duration} linear infinite ${dir}`,
                        }}
                    />
                ))}
            </div>

            {/* ── Corner brackets ── */}
            <div className="absolute top-28 left-8 w-10 h-px bg-red-500/30 pointer-events-none" />
            <div className="absolute top-28 left-8 w-px h-10 bg-red-500/30 pointer-events-none" />
            <div className="absolute top-28 right-8 w-10 h-px bg-red-500/30 pointer-events-none" />
            <div className="absolute top-28 right-8 w-px h-10 bg-red-500/30 pointer-events-none" />
            <div className="absolute bottom-20 left-8 w-10 h-px bg-white/15 pointer-events-none" />
            <div className="absolute bottom-20 left-8 w-px h-10 bg-white/15 pointer-events-none translate-y-[-100%]" />

            {/* ── Main Hero Content ── */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-28 pb-20">

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="inline-flex items-center gap-2.5 border border-red-500/40 bg-red-500/5 rounded-full px-5 py-2 mb-10"
                >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                    <span className="text-white/60 text-xs font-mono tracking-[0.22em] uppercase">
                        Available for hire · 2025
                    </span>
                </motion.div>

                {/* Name block */}
                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-4"
                >
                    {/* Sub-label above name */}
                    <p className="text-white/20 text-xs font-mono tracking-[0.4em] uppercase mb-4">
                        // Portfolio · Full-Stack Developer
                    </p>

                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-orbitron font-black leading-none tracking-tight cursor-pointer select-none"
                        onClick={onReset}
                        title="Back to Opening"
                    >
                        {/* First word white */}
                        <span className="text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.18)]">
                            {heroData.name.split(" ").slice(0, 2).map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block mr-5 last:mr-0"
                                    whileHover={{ scale: 1.04, y: -5 }}
                                    transition={{ type: "spring", stiffness: 350 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        {/* Last word — outlined red */}
                        <span
                            className="block mt-1"
                            style={{
                                WebkitTextStroke: "2px rgba(220,38,38,0.7)",
                                color: "transparent",
                                textShadow: "0 0 60px rgba(220,38,38,0.2)",
                            }}
                        >
                            {heroData.name.split(" ").slice(2).join(" ")}
                        </span>
                    </h1>

                    {/* Underline */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-5 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent origin-center"
                    />
                </motion.div>

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="flex items-center justify-center gap-3 mb-7 mt-2 h-10 md:h-12"
                >
                    <span className="text-white/30 text-xl md:text-2xl font-light">I am</span>
                    <span className="text-xl md:text-2xl font-light">
                        <Typewriter />
                    </span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-white/40 text-sm md:text-base max-w-lg leading-relaxed mb-10 font-light"
                >
                    {heroData.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                    className="flex flex-col sm:flex-row gap-4 items-center mb-12"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 45px rgba(220,38,38,0.55)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-3 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-full shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-colors duration-200"
                    >
                        Explore Projects
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/chellamuthu-kumar-4ab4373a0"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-3 px-8 py-3.5 border border-white/15 text-white/70 hover:text-white hover:border-white/40 font-medium text-sm rounded-full transition-all duration-200"
                    >
                        <FaLinkedin className="text-base group-hover:text-blue-400 transition-colors" />
                        LinkedIn
                    </motion.a>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center gap-3 mb-12"
                >
                    {socialLinks.map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -4, scale: 1.18 }}
                            title={s.name}
                            className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center
                                text-white/30 hover:text-white hover:border-white/50 transition-all duration-200"
                        >
                            <s.icon size={15} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center gap-10 border-t border-white/8 pt-7"
                >
                    {[
                        { num: "3+", label: "Years exp." },
                        { num: "25+", label: "Projects" },
                        { num: "15+", label: "Technologies" },
                    ].map(({ num, label }, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-2xl md:text-3xl font-orbitron font-black text-white group-hover:text-red-400 transition-colors duration-300">
                                {num}
                            </div>
                            <div className="text-white/25 text-[10px] font-mono uppercase tracking-widest mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                >
                    <HiOutlineArrowDown className="text-white/30 text-xl" />
                </motion.div>
                <span className="text-white/15 text-[9px] font-mono tracking-[0.4em] uppercase">scroll</span>
            </motion.div>
            </section>
        </ParallaxBackground>
    );
};

export default Hero;
