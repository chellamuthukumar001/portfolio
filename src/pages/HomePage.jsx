import { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import AnimatedBackground from '../components/AnimatedBackground';
import { useNavTransition } from '../context/NavTransitionContext';

const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const EduTimeline = lazy(() => import('../components/EduTimeline'));
const Contact = lazy(() => import('../components/Contact'));
const Services = lazy(() => import('../components/Services'));
const Certifications = lazy(() => import('../components/Certifications'));

// ─── Unique background per section (deeper red-black tints) ──────────────────
const SECTION_BG = {
    hero:           { color: '#000000',  label: 'Home' },
    stats:          { color: '#0a0000',  label: 'Stats' },
    about:          { color: '#140000',  label: 'About' },
    services:       { color: '#080000',  label: 'Services' },
    skills:         { color: '#180000',  label: 'Skills' },
    certifications: { color: '#0c0000',  label: 'Certifications' },
    projects:       { color: '#050000',  label: 'Projects' },
    education:      { color: '#120000',  label: 'Education' },
    contact:        { color: '#000000',  label: 'Contact' },
};

// ─── Section patterns (more visible red-tinted) ───────────────────────────────
const PATTERNS = {
    hero: null,
    stats: null,
    about: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.07) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
    },
    services: {
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(220,38,38,0.055) 0, rgba(220,38,38,0.055) 1px, transparent 0, transparent 50%)',
        backgroundSize: '24px 24px',
    },
    skills: {
        backgroundImage: 'radial-gradient(rgba(220,38,38,0.10) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
    },
    certifications: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.065) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
    },
    projects: {
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(220,38,38,0.05) 0, rgba(220,38,38,0.05) 1px, transparent 0, transparent 50%)',
        backgroundSize: '28px 28px',
    },
    education: {
        backgroundImage: 'radial-gradient(rgba(220,38,38,0.09) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
    },
    contact: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
    },
};

// ─── Section radial glows — stronger, more vivid ─────────────────────────────
const GLOWS = {
    hero:           'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(220,38,38,0.13) 0%, transparent 70%)',
    stats:          'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)',
    about:          'radial-gradient(ellipse 55% 65% at 80% 50%, rgba(220,38,38,0.10) 0%, transparent 70%)',
    services:       'radial-gradient(ellipse 45% 50% at 10% 80%, rgba(185,28,28,0.10) 0%, transparent 70%)',
    skills:         'radial-gradient(ellipse 65% 55% at 50% 20%, rgba(220,38,38,0.12) 0%, transparent 70%)',
    certifications: 'radial-gradient(ellipse 55% 45% at 90% 30%, rgba(185,28,28,0.10) 0%, transparent 70%)',
    projects:       'radial-gradient(ellipse 45% 65% at 20% 60%, rgba(220,38,38,0.10) 0%, transparent 70%)',
    education:      'radial-gradient(ellipse 55% 45% at 70% 70%, rgba(185,28,28,0.10) 0%, transparent 70%)',
    contact:        'radial-gradient(ellipse 65% 55% at 50% 80%, rgba(220,38,38,0.12) 0%, transparent 70%)',
};

const ORDER = ['hero', 'stats', 'about', 'services', 'skills', 'certifications', 'projects', 'education', 'contact'];

// ─── Loading fallback ─────────────────────────────────────────────────────────
const SectionFallback = () => (
    <div className="w-full min-h-[300px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-red-500/50 rounded-full animate-spin" />
    </div>
);

// ─── Individual scroll-detect section ────────────────────────────────────────
function Section({ id, onEnter, children }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onEnter(id);
            },
            { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [id, onEnter]);

    return (
        <div ref={ref} id={id} className="relative w-full">
            {/* Top hairline separator — red-tinted */}
            <div className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.25), rgba(255,255,255,0.06), rgba(220,38,38,0.25), transparent)' }} />
            {children}
        </div>
    );
}

// ─── Fixed full-screen background ────────────────────────────────────────────
function SiteBackground({ activeSection }) {
    return (
        <>
            {/* Base color layer — BELOW canvas (z-[-10]) */}
            <div
                className="fixed inset-0 z-[-10] pointer-events-none"
                style={{
                    backgroundColor: SECTION_BG[activeSection]?.color ?? '#000000',
                    transition: 'background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />

            {/* Pattern layer — AnimatePresence for cross-fade */}
            <AnimatePresence mode="wait">
                {PATTERNS[activeSection] && (
                    <motion.div
                        key={`pattern-${activeSection}`}
                        className="fixed inset-0 z-[-2] pointer-events-none"
                        style={PATTERNS[activeSection]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                )}
            </AnimatePresence>

            {/* Radial glow layer — unique per section */}
            <motion.div
                className="fixed inset-0 z-[-1] pointer-events-none"
                animate={{ background: GLOWS[activeSection] ?? 'none' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
        </>
    );
}

// ─── Section indicator dots (right side) ─────────────────────────────────────
function SectionDots({ activeSection }) {
    const { navigateTo } = useNavTransition();

    const sectionIdMap = {
        hero: 'home', stats: 'home', about: 'about',
        services: 'services', skills: 'skills',
        certifications: 'certifications', projects: 'projects',
        education: 'education', contact: 'contact',
    };

    const visible = ORDER.filter(s => s !== 'stats');

    return (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none hidden lg:flex">
            {visible.map((id) => {
                const isActive = activeSection === id;
                return (
                    <button
                        key={id}
                        onClick={(e) => navigateTo(sectionIdMap[id], e)}
                        className="pointer-events-auto group flex items-center gap-2.5 justify-end bg-transparent border-none cursor-pointer"
                        title={SECTION_BG[id]?.label}
                    >
                        {/* Label */}
                        <span className={`text-[9px] font-mono uppercase tracking-widest transition-all duration-300
                            ${isActive ? 'text-red-400 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}>
                            {SECTION_BG[id]?.label}
                        </span>

                        {/* Dot / pill */}
                        <div
                            className={`rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'w-6 h-2 bg-red-500'
                                    : 'w-1.5 h-1.5 bg-white/15 group-hover:bg-red-500/40 group-hover:scale-125'
                            }`}
                            style={isActive ? {
                                boxShadow: '0 0 10px rgba(220,38,38,1), 0 0 20px rgba(220,38,38,0.5)',
                            } : {}}
                        />
                    </button>
                );
            })}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const HomePage = ({ onReset }) => {
    const [activeSection, setActiveSection] = useState('hero');

    const handleEnter = useCallback((id) => {
        setActiveSection(id);
    }, []);

    // Scroll progress (0–1)
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
            setScrollProgress(Math.min(1, Math.max(0, progress)));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* ── Top scroll progress bar ── */}
            <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                    className="h-full"
                    style={{
                        width: `${scrollProgress * 100}%`,
                        background: 'linear-gradient(90deg, #dc2626, #ef4444, #f87171)',
                        boxShadow: '0 0 8px rgba(220,38,38,0.8)',
                    }}
                />
            </div>

            {/* Animated canvas background — always visible */}
            <AnimatedBackground />

            {/* Fixed color transition layer on top of canvas */}
            <SiteBackground activeSection={activeSection} />

            {/* Side navigation dots */}
            <SectionDots activeSection={activeSection} />

            {/* Active section watermark */}
            <motion.div
                key={activeSection}
                className="fixed bottom-8 left-8 z-40 pointer-events-none hidden lg:flex items-center gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-4 h-px bg-red-500/40" />
                <span className="text-[10px] font-mono text-white/15 uppercase tracking-[0.3em]">
                    {SECTION_BG[activeSection]?.label}
                </span>
            </motion.div>

            {/* Page content */}
            <div className="relative w-full overflow-x-hidden" style={{ backgroundColor: 'transparent' }}>

                <Section id="hero" onEnter={handleEnter}>
                    <Hero onReset={onReset} />
                </Section>

                <Section id="stats" onEnter={handleEnter}>
                    <StatsSection />
                </Section>

                <Section id="about" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <About />
                    </Suspense>
                </Section>

                <Section id="services" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <Services />
                    </Suspense>
                </Section>

                <Section id="skills" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <Skills />
                    </Suspense>
                </Section>

                <Section id="certifications" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <Certifications />
                    </Suspense>
                </Section>

                <Section id="projects" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <Projects />
                    </Suspense>
                </Section>

                <Section id="education" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <EduTimeline />
                    </Suspense>
                </Section>

                <Section id="contact" onEnter={handleEnter}>
                    <Suspense fallback={<SectionFallback />}>
                        <Contact />
                    </Suspense>
                </Section>

            </div>
        </>
    );
};

export default HomePage;
