import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroData, socialLinks } from "../constants";
import { FaFileDownload, FaArrowRight, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";

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
            <span className="text-white font-semibold">{text}</span>
            <span className="w-[2px] h-6 md:h-8 bg-white animate-blink inline-block" />
        </span>
    );
}

const Hero = ({ onReset }) => {
    return (
        <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden">

            {/* ── Animated rings behind content ─────────────────── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {[700, 500, 350].map((size, i) => (
                    <motion.div
                        key={size}
                        className="absolute rounded-full border border-red-500/[0.08]"
                        style={{ width: size, height: size }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
                        transition={{ rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" }, scale: { duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" } }}
                    />
                ))}
            </div>

            {/* ── Corner decoration lines ────────────────────────── */}
            <div className="absolute top-32 left-8 w-12 h-px bg-white/20 pointer-events-none" />
            <div className="absolute top-32 left-8 w-px h-12 bg-white/20 pointer-events-none" />
            <div className="absolute top-32 right-8 w-12 h-px bg-white/20 pointer-events-none ml-auto" />
            <div className="absolute top-32 right-8 w-px h-12 bg-white/20 pointer-events-none" />
            <div className="absolute bottom-20 left-8 w-12 h-px bg-white/20 pointer-events-none" />
            <div className="absolute bottom-20 left-8 w-px h-12 bg-white/20 pointer-events-none translate-y-[-100%]" />

            {/* ── Main Hero Content ──────────────────────────────── */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-16 pt-28 pb-20">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 border border-red-500/30 rounded-full px-4 py-1.5 mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white/50 text-xs font-mono tracking-[0.2em] uppercase">
                        Open to work · 2025
                    </span>
                </motion.div>

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6"
                >
                    <h1
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-orbitron font-black leading-none tracking-tight cursor-pointer select-none"
                        onClick={onReset}
                        title="Back to Opening"
                    >
                        <span className="text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                            {heroData.name.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block mr-4 last:mr-0"
                                    whileHover={{ scale: 1.04, y: -4 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                    </h1>

                    {/* Underline */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent origin-center"
                    />
                </motion.div>

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 mb-6 h-10 md:h-12"
                >
                    <span className="text-white/30 text-lg md:text-2xl font-light">I build</span>
                    <span className="text-lg md:text-2xl font-light">
                        <Typewriter />
                    </span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="text-white/35 text-sm md:text-base max-w-xl leading-relaxed mb-10 font-light"
                >
                    {heroData.subtitle}
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 items-center mb-12"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(220,38,38,0.45)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-full
                            shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300"
                    >
                        Explore Projects
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center gap-4"
                >
                    {socialLinks.map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -4, scale: 1.15 }}
                            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center
                                text-white/35 hover:text-white hover:border-white/50 hover:bg-white/8
                                transition-all duration-200"
                        >
                            <s.icon size={15} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="flex items-center gap-8 mt-14 border-t border-white/8 pt-8"
                >
                    {[
                        { num: "3+", label: "Years exp." },
                        { num: "25+", label: "Projects" },
                        { num: "15+", label: "Technologies" },
                    ].map(({ num, label }, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-orbitron font-black text-white">{num}</div>
                            <div className="text-white/25 text-xs font-mono uppercase tracking-wider mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Scroll down indicator ─────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                >
                    <HiOutlineArrowDown className="text-white/25 text-xl" />
                </motion.div>
                <span className="text-white/15 text-[9px] font-mono tracking-[0.4em] uppercase">scroll</span>
            </motion.div>
        </section>
    );
};

export default Hero;
