import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ParallaxBackground - Creates multi-layer parallax effect for cinematic depth
 * Different layers move at different speeds based on scroll position
 * Optimized for mobile performance
 */
export const ParallaxBackground = ({ children, intensity = 30 }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            if (window.innerWidth > 1024 && !isMobile) {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 2;
                const y = (clientY / window.innerHeight - 0.5) * 2;
                setMousePosition({ x: x * intensity * 0.02, y: y * intensity * 0.02 });
            }
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, [intensity, isMobile]);

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            {/* Layer 1 - Far background (moves slowest) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 120% 100% at 50% 50%, rgba(0,170,255,0.08) 0%, transparent 70%)',
                    y: scrollY * 0.02,
                    x: mousePosition.x * 0.3,
                }}
                transition={{ type: 'spring', damping: 100, stiffness: 100 }}
            />

            {/* Layer 2 - Mid background */}
            <motion.div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(185,28,28,0.05) 0%, transparent 80%)',
                    y: scrollY * 0.04,
                    x: mousePosition.x * 0.5,
                }}
                transition={{ type: 'spring', damping: 100, stiffness: 100 }}
            />

            {/* Layer 3 - Foreground elements (moves faster) */}
            <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    y: scrollY * 0.06,
                    x: mousePosition.x * 0.7,
                }}
                transition={{ type: 'spring', damping: 100, stiffness: 100 }}
            >
                <div className="absolute top-20 right-0 w-96 h-96 bg-red-500/[0.04] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-600/[0.03] rounded-full blur-3xl" />
            </motion.div>

            {/* Content layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

/**
 * FloatingParticles - Animated background particles for cinematic effect
 */
export const FloatingParticles = ({ count = 20, speed = 0.5 }) => {
    const particles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 15 + Math.random() * 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
    }));

    return (
        <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white/40"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -50, 0],
                        opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

/**
 * CinematicGradientBg - Animated gradient background that shifts smoothly
 */
export const CinematicGradientBg = ({ animate = true }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[-1]"
            animate={
                animate && {
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }
            }
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            style={{
                background: `linear-gradient(-45deg, #000000, #0a0000, #000000, #140000, #000000)`,
                backgroundSize: '400% 400%',
            }}
        />
    );
};

export default ParallaxBackground;

