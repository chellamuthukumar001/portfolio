import { useState, useEffect, memo, useCallback } from "react";
import { navLinks } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useNavTransition } from "../context/NavTransitionContext";

const Navbar = memo(function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { navigateTo } = useNavTransition();

    // Throttled scroll handler
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const observers = navLinks.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0.25 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    // Simplified nav click - use smooth scroll for better performance
    const handleNavClick = useCallback((e, id) => {
        e.preventDefault();
        setToggle(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/5 py-2.5 md:py-3"
            : "bg-transparent py-4 md:py-5"
            }`}>

            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">

                {/* Logo */}
                <button
                    onClick={(e) => handleNavClick(e, "home")}
                    className="group flex items-center gap-2 md:gap-3"
                >
                    <div className="w-8 h-8 md:w-9 md:h-9 border border-red-500/30 rounded-lg flex items-center justify-center
                        group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-200">
                        <span className="text-white/80 group-hover:text-white text-[10px] md:text-xs font-orbitron font-black">
                            CM
                        </span>
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-white text-xs md:text-sm font-orbitron font-bold leading-none group-hover:text-red-400 transition-colors">
                            Chella Muthu
                        </p>
                        <p className="text-white/20 text-[8px] md:text-[9px] font-mono uppercase tracking-widest mt-0.5">
                            Portfolio 2025
                        </p>
                    </div>
                </button>

                {/* Desktop nav links */}
                <ul className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map(({ id, title }) => (
                        <li key={id}>
                            <button
                                onClick={(e) => handleNavClick(e, id)}
                                className={`relative px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer ${activeSection === id
                                    ? "text-white bg-red-500/15 border border-red-500/25"
                                    : "text-white/40 hover:text-white/70"
                                    }`}
                            >
                                {title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={(e) => handleNavClick(e, "contact")}
                        className="hidden lg:flex items-center gap-2 px-4 xl:px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-[10px] xl:text-xs font-bold rounded-full
                            shadow-[0_0_12px_rgba(220,38,38,0.25)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-200"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Hire Me
                    </button>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="lg:hidden w-9 h-9 border border-white/15 rounded-lg flex items-center justify-center
                            text-white/70 hover:bg-white/5 hover:border-white/25 transition-colors"
                    >
                        {toggle ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {toggle && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-3 right-3 mt-2 bg-black/95 backdrop-blur-xl
                            border border-white/10 rounded-xl p-3 lg:hidden shadow-xl"
                    >
                        <ul className="grid grid-cols-2 gap-1.5">
                            {navLinks.map(({ id, title }) => (
                                <li key={id}>
                                    <button
                                        onClick={(e) => handleNavClick(e, id)}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${activeSection === id
                                            ? "bg-red-500/15 text-white"
                                            : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                            }`}
                                    >
                                        {activeSection === id && (
                                            <span className="inline-block w-1 h-1 rounded-full bg-red-500 mr-2" />
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
});

export default Navbar;
