import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * SectionTransition wrapper - applies cinematic entrance and exit effects
 * Creates zoom, pan, and fade transitions as you navigate sections
 */
export const SectionTransition = ({ children, section = 'default', delay = 0 }) => {
    const ref = useRef(null);

    // Different animation patterns per section for variety
    const animations = {
        hero: {
            initial: { opacity: 0, scale: 1.1, y: 50 },
            whileInView: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: -50 },
        },
        about: {
            initial: { opacity: 0, x: -100, rotateY: 15 },
            whileInView: { opacity: 1, x: 0, rotateY: 0 },
            exit: { opacity: 0, x: 100, rotateY: -15 },
        },
        services: {
            initial: { opacity: 0, scale: 0.95, y: 40 },
            whileInView: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: -40 },
        },
        skills: {
            initial: { opacity: 0, y: 60 },
            whileInView: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -60 },
        },
        projects: {
            initial: { opacity: 0, scale: 0.98, y: 50 },
            whileInView: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 1.02, y: -50 },
        },
        education: {
            initial: { opacity: 0, x: 100 },
            whileInView: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -100 },
        },
        contact: {
            initial: { opacity: 0, y: 80 },
            whileInView: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -80 },
        },
    };

    const anim = animations[section] || animations.default;

    return (
        <motion.div
            ref={ref}
            initial={anim.initial}
            whileInView={anim.whileInView}
            exit={anim.exit}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94], // smooth cubic easing
            }}
            viewport={{
                once: true,
                margin: '-80px',
                amount: 'some',
            }}
        >
            {children}
        </motion.div>
    );
};

/**
 * CinematicReveal - Staggered reveal effect for content blocks
 */
export const CinematicReveal = ({ children, stagger = 0.1 }) => {
    const childArray = Array.isArray(children) ? children : [children];

    return (
        <>
            {childArray.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: i * stagger,
                        ease: 'easeOut',
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {child}
                </motion.div>
            ))}
        </>
    );
};

/**
 * ZoomOnScroll - Creates a zoom effect as you scroll into view
 */
export const ZoomOnScroll = ({ children, intensity = 0.1 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 - intensity }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: '-100px' }}
        >
            {children}
        </motion.div>
    );
};

/**
 * FadeInOnScroll - Simple but elegant fade-in effect
 */
export const FadeInOnScroll = ({ children, duration = 0.6, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration,
                delay,
            }}
            viewport={{ once: true, margin: '-80px' }}
        >
            {children}
        </motion.div>
    );
};

/**
 * SlideInFromSide - Slides content in from left or right
 */
export const SlideInFromSide = ({ children, direction = 'left', delay = 0 }) => {
    const initialX = direction === 'left' ? -100 : 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: '-80px' }}
        >
            {children}
        </motion.div>
    );
};

export default SectionTransition;
