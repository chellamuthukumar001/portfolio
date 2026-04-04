import { useEffect, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { heroData, socialLinks } from "../constants";
import { FaArrowRight, FaLinkedin, FaDownload } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";

const ROLES = ["Full Stack Developer", "React Specialist", "IoT Engineer", "Mobile App Dev"];

// Optimized typewriter with useCallback
const Typewriter = memo(function Typewriter() {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = ROLES[idx % ROLES.length];
        const speed = deleting ? 40 : 70;

        const t = setTimeout(() => {
            if (!deleting) {
                setText(word.substring(0, text.length + 1));
                if (text === word) setTimeout(() => setDeleting(true), 2000);
            } else {
                setText(word.substring(0, text.length - 1));
                if (text === "") {
                    setDeleting(false);
                    setIdx(i => i + 1);
                }
            }
        }, speed);
        return () => clearTimeout(t);
    }, [text, deleting, idx]);

    return (
        <span className="inline-flex items-center gap-1">
            <span className="text-red-400 font-semibold">{text}</span>
            <span className="w-0.5 h-6 md:h-8 bg-red-400 animate-blink inline-block" />
        </span>
    );
});

const Hero = memo(function Hero({ onReset }) {
    return (
        <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden">
            {/* Rich background glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(220,38,38,0.1) 0%, transparent 70%)',
                }}
            />

            {/* Animated rings - CSS only for performance */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="absolute w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full border border-red-500/[0.07] animate-[spin_45s_linear_infinite]" />
                <div className="absolute w-[450px] h-[450px] md:w-[540px] md:h-[540px] rounded-full border border-red-500/10 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-red-500/[0.12] animate-[spin_20s_linear_infinite]" />
            </div>

            {/* Corner brackets - simplified */}
            <div className="absolute top-24 left-6 md:left-8 w-8 h-8 border-l-2 border-t-2 border-red-500/25 pointer-events-none" />
            <div className="absolute top-24 right-6 md:right-8 w-8 h-8 border-r-2 border-t-2 border-red-500/25 pointer-events-none" />
            <div className="absolute bottom-24 left-6 md:left-8 w-8 h-8 border-l-2 border-b-2 border-white/10 pointer-events-none" />
            <div className="absolute bottom-24 right-6 md:right-8 w-8 h-8 border-r-2 border-b-2 border-white/10 pointer-events-none" />

            {/* Main Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-16 pt-24 md:pt-28 pb-16 md:pb-20">

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2.5 border border-red-500/30 bg-red-500/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8 md:mb-10"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    <span className="text-white/50 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                        Open to opportunities
                    </span>
                </motion.div>

                {/* Name block */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-4"
                >
                    <p className="text-white/25 text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase mb-3 md:mb-4">
                        Portfolio 2025
                    </p>

                    <h1
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-black leading-[1.1] tracking-tight cursor-pointer select-none"
                        onClick={onReset}
                        title="Back to Opening"
                    >
                        <span className="text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]">
                            {heroData.name.split(" ").slice(0, 2).map((word, i) => (
                                <span key={i} className="inline-block mr-3 md:mr-5 last:mr-0 hover:text-red-400 transition-colors duration-300">
                                    {word}
                                </span>
                            ))}
                        </span>
                        <span
                            className="block mt-1 md:mt-2"
                            style={{
                                WebkitTextStroke: "1.5px rgba(220,38,38,0.6)",
                                color: "transparent",
                            }}
                        >
                            {heroData.name.split(" ").slice(2).join(" ")}
                        </span>
                    </h1>

                    {/* Underline */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-4 md:mt-5 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent origin-center max-w-md mx-auto"
                    />
                </motion.div>

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2 md:gap-3 mb-5 md:mb-7 mt-2 h-8 md:h-10"
                >
                    <span className="text-white/30 text-lg md:text-xl font-light">I am a</span>
                    <span className="text-lg md:text-xl font-light">
                        <Typewriter />
                    </span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/35 text-sm md:text-base max-w-md md:max-w-lg leading-relaxed mb-8 md:mb-10 font-light px-4"
                >
                    {heroData.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center mb-10 md:mb-12"
                >
                    <a
                        href="#projects"
                        className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-full shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] transition-all duration-300"
                    >
                        View My Work
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/chellamuthu-kumar-4ab4373a0"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-medium text-sm rounded-full transition-all duration-300"
                    >
                        <FaLinkedin className="text-base group-hover:text-blue-400 transition-colors" />
                        Connect
                    </a>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2 md:gap-3 mb-10 md:mb-12"
                >
                    {socialLinks.map((s, i) => (
                        <a
                            key={i}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            title={s.name}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center
                                text-white/30 hover:text-white hover:border-white/40 hover:-translate-y-1 transition-all duration-200"
                        >
                            <s.icon size={14} />
                        </a>
                    ))}
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-6 sm:gap-8 md:gap-10 border-t border-white/8 pt-6 md:pt-7"
                >
                    {[
                        { num: "3+", label: "Years" },
                        { num: "25+", label: "Projects" },
                        { num: "15+", label: "Tech Stack" },
                    ].map(({ num, label }, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-xl sm:text-2xl md:text-3xl font-orbitron font-black text-white group-hover:text-red-400 transition-colors duration-300">
                                {num}
                            </div>
                            <div className="text-white/25 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator - CSS animation only */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <div className="animate-bounce">
                    <HiOutlineArrowDown className="text-white/25 text-lg md:text-xl" />
                </div>
                <span className="text-white/15 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase">scroll</span>
            </div>
        </section>
    );
});

export default Hero;
