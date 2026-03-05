import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavTransition } from "../context/NavTransitionContext";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Get the nav transition function from context
    const { navigateTo } = useNavTransition();

    // Navbar background on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section via IntersectionObserver
    useEffect(() => {
        const observers = navLinks.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0.3 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    // ── Intercepted nav click — plays transition then scrolls ─────────────────
    const handleNavClick = (e, id) => {
        e.preventDefault();
        setToggle(false);

        // Map of unique transition effects per section
        const transitionMap = {
            home: 'warp',
            about: 'glitch',
            services: 'grid',
            projects: 'ripple',
            skills: 'flash',
            experience: 'glitch',
            education: 'ripple',
            contact: 'flash',
            certifications: 'grid'
        };

        navigateTo(id, e, transitionMap[id] || 'ripple');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-black/75 backdrop-blur-xl border-b border-red-500/10 py-3"
            : "bg-transparent py-5"
            }`}>
            {/* Scroll progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-red-500/60 origin-left"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* ── Logo ─────────────────────────────────────── */}
                <button
                    onClick={(e) => handleNavClick(e, "home")}
                    className="group flex items-center gap-3"
                >
                    <div className="w-9 h-9 border border-red-500/40 rounded-lg flex items-center justify-center
                        group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300
                        shadow-[0_0_12px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_18px_rgba(220,38,38,0.4)]">
                        <span className="text-white/80 group-hover:text-white text-xs font-orbitron font-black transition-colors">
                            CM
                        </span>
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-white text-sm font-orbitron font-bold leading-none group-hover:text-red-400 transition-colors">
                            Chella Muthu
                        </p>
                        <p className="text-white/20 text-[9px] font-mono uppercase tracking-[0.2em] mt-0.5">
                            Portfolio 2025
                        </p>
                    </div>
                </button>

                {/* ── Desktop nav links (centered) ─────────────── */}
                <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map(({ id, title }) => (
                        <li key={id}>
                            <button
                                onClick={(e) => handleNavClick(e, id)}
                                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${activeSection === id
                                    ? "text-white"
                                    : "text-white/35 hover:text-white/70"
                                    }`}
                            >
                                {/* Active pill slides between items */}
                                {activeSection === id && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-red-500/15 border border-red-500/30 rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{title}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* ── Right side ───────────────────────────────── */}
                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={(e) => handleNavClick(e, "contact")}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="hidden md:flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-full
                            shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.55)] transition-all"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Hire Me
                    </motion.button>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="md:hidden w-9 h-9 border border-red-500/30 rounded-lg flex items-center justify-center
                            text-white hover:bg-red-500/10 hover:border-red-500/60 transition-all"
                    >
                        {toggle ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ──────────────────────────────────── */}
            <AnimatePresence>
                {toggle && (
                    <motion.div
                        initial={{ opacity: 0, y: -14, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -14, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-4 right-4 mt-2 bg-black/95 backdrop-blur-2xl
                            border border-red-500/15 rounded-2xl p-4 md:hidden shadow-2xl
                            shadow-red-500/5"
                    >
                        {/* Top accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent mb-4" />

                        <ul className="grid grid-cols-2 gap-1.5">
                            {navLinks.map(({ id, title }) => (
                                <li key={id}>
                                    <button
                                        onClick={(e) => handleNavClick(e, id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${activeSection === id
                                            ? "bg-red-500/15 text-white border border-red-500/30"
                                            : "text-white/40 hover:bg-red-500/8 hover:text-white/70 border border-transparent"
                                            }`}
                                    >
                                        {/* Active dot */}
                                        {activeSection === id && (
                                            <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2 mb-0.5" />
                                        )}
                                        {title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
