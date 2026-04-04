import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CinematicScroll - Applies smooth camera-like movements based on scroll position
 * Creates a cinematic parallax effect where different layers move at different speeds
 * Disabled on mobile for better performance
 */
export const CinematicScroll = ({ children, intensity = 1 }) => {
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <motion.div
            style={{
                y: isMobile ? 0 : scrollY * 0.05 * intensity,
            }}
            transition={{ type: 'spring', damping: 100, stiffness: 100 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * ParallaxLayer - Creates depth with parallax effects
 * Deeper layers move slower for cinematic depth of field
 * Optimized for mobile
 */
export const ParallaxLayer = ({ children, depth = 0.5 }) => {
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <motion.div
            style={{
                y: isMobile ? 0 : scrollY * depth * -0.08,
            }}
            transition={{ type: 'spring', damping: 100, stiffness: 100 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * CinematicOverlay - Creates film-like overlay with vignette and chromatic effects
 */
export const CinematicOverlay = ({ intensity = 0.3 }) => {
    return (
        <>
            {/* Vignette effect */}
            <div
                className="fixed inset-0 z-[999] pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,${intensity * 0.4}) 100%)`,
                }}
            />

            {/* Film grain */}
            <div
                className="fixed inset-0 z-[999] pointer-events-none"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            0deg,
                            rgba(255, 255, 255, ${intensity * 0.03}),
                            rgba(255, 255, 255, ${intensity * 0.03}) 1px,
                            transparent 1px,
                            transparent 2px
                        )
                    `,
                    animation: `grain 0.5s steps(2) infinite`,
                }}
            />

            <style>{`
                @keyframes grain {
                    0%, 100% { transform: translateY(0, 0); }
                    10% { transform: translate(2px, -2px); }
                    20% { transform: translate(-2px, 2px); }
                    30% { transform: translate(2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    50% { transform: translate(1px, -1px); }
                    60% { transform: translate(-1px, 1px); }
                    70% { transform: translate(1px, 1px); }
                    80% { transform: translate(-1px, -1px); }
                    90% { transform: translate(2px, 1px); }
                }
            `}</style>
        </>
    );
};

/**
 * CinematicTransition - Smooth zoom and fade transitions between sections
 */
export const CinematicTransition = ({ trigger = false, children, duration = 0.8 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration,
                ease: [0.25, 0.46, 0.45, 0.94], // smooth easing
            }}
            viewport={{ once: false, margin: '-100px' }}
        >
            {children}
        </motion.div>
    );
};

/**
 * CinematicText - Reveals text with cinematic stagger effect
 */
export const CinematicText = ({ children, staggerDelay = 0.05 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
        >
            {typeof children === 'string'
                ? children.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: i * staggerDelay,
                            duration: 0.4,
                        }}
                        viewport={{ once: false }}
                    >
                        {char}
                    </motion.span>
                ))
                : children}
        </motion.div>
    );
};

export default CinematicScroll;
