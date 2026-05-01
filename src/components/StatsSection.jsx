import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaProjectDiagram, FaMicrochip, FaStar } from 'react-icons/fa';

const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let current = 0;
        const steps = 60;
        const increment = target / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, 2000 / steps);
        return () => clearInterval(timer);
    }, [started, target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => {
    const stats = [
        { label: 'Years Experience', value: 3, suffix: '+', icon: FaBriefcase, color: '#ef4444' },
        { label: 'Projects Built', value: 25, suffix: '+', icon: FaProjectDiagram, color: '#f87171' },
        { label: 'Technologies', value: 15, suffix: '+', icon: FaMicrochip, color: '#ef4444' },
        { label: 'Satisfaction', value: 100, suffix: '%', icon: FaStar, color: '#fca5a5' },
    ];

    return (
        <section className="relative w-full py-20 overflow-hidden">
            {/* Top / bottom borders */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,170,255,0.4), transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,170,255,0.4), transparent)' }} />

            {/* Faint horizontal glow band */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,170,255,0.05) 0%, transparent 70%)' }} />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
                                className="relative group flex flex-col items-center py-10 px-4"
                            >
                                {/* Vertical divider (except first) */}
                                {index > 0 && (
                                    <div className="absolute left-0 top-[20%] bottom-[20%] w-px"
                                        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
                                )}

                                {/* Icon circle */}
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-red-500/20 bg-red-500/5
                                        group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:scale-110
                                        group-hover:shadow-[0_0_20px_rgba(0,170,255,0.2)] transition-all duration-300"
                                >
                                    <Icon className="text-lg" style={{ color: stat.color }} />
                                </div>

                                {/* Counter */}
                                <h3 className="text-5xl md:text-6xl font-orbitron font-black text-white mb-2
                                    group-hover:text-red-400 transition-colors duration-300"
                                    style={{ textShadow: '0 0 40px rgba(0,170,255,0)' }}
                                >
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                </h3>

                                {/* Label */}
                                <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-mono text-center
                                    group-hover:text-white/50 transition-colors duration-300">
                                    {stat.label}
                                </p>

                                {/* Bottom accent line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.12 + 0.3, duration: 0.6 }}
                                    className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent origin-center"
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-white/15 text-[10px] font-mono tracking-[0.3em] uppercase mt-4"
                >
                    // Continuously growing Â· 2025
                </motion.p>
            </div>
        </section>
    );
};

export default StatsSection;

