import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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
        { label: 'Years Experience', value: 3, suffix: '+' },
        { label: 'Projects Built', value: 25, suffix: '+' },
        { label: 'Technologies', value: 15, suffix: '+' },
        { label: 'Satisfaction', value: 100, suffix: '%' },
    ];

    return (
        <section className="relative w-full py-16 border-y border-white/8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center group relative"
                        >
                            {/* Separator (except last) */}
                            {index < stats.length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/8" />
                            )}

                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-black text-white mb-2
                                group-hover:text-white/80 transition-colors">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-white/25 text-xs uppercase tracking-[0.2em] font-mono">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
