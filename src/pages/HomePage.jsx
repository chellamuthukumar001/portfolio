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

// ─── Unique background per section (red-black tints) ─────────────────────────
const SECTION_BG = {
    hero: { color: '#000000', label: 'Hero' },
    stats: { color: '#0f0000', label: 'Stats' },
    about: { color: '#160000', label: 'About' },
    services: { color: '#080000', label: 'Services' },
    skills: { color: '#1a0000', label: 'Skills' },
    certifications: { color: '#0c0000', label: 'Certifications' },
    projects: { color: '#050000', label: 'Projects' },
    education: { color: '#140000', label: 'Education' },
    contact: { color: '#000000', label: 'Contact' },
};

// ─── Section patterns (red-tinted) ───────────────────────────────────────────
const PATTERNS = {
    hero: null,
    stats: null,
    about: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.06) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
    },
    services: {
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(220,38,38,0.04) 0, rgba(220,38,38,0.04) 1px, transparent 0, transparent 50%)',
        backgroundSize: '24px 24px',
    },
    skills: {
        backgroundImage: 'radial-gradient(rgba(220,38,38,0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
    },
    certifications: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
    },
    projects: {
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(220,38,38,0.035) 0, rgba(220,38,38,0.035) 1px, transparent 0, transparent 50%)',
        backgroundSize: '28px 28px',
    },
    education: {
        backgroundImage: 'radial-gradient(rgba(220,38,38,0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
    },
    contact: {
        backgroundImage: 'linear-gradient(rgba(220,38,38,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.06) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
    },
};

// ─── Section radial glows (red per section) ───────────────────────────────────
const GLOWS = {
    hero: 'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(220,38,38,0.08) 0%, transparent 70%)',
    stats: 'none',
    about: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(220,38,38,0.06) 0%, transparent 70%)',
    services: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(185,28,28,0.06) 0%, transparent 70%)',
    skills: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(220,38,38,0.08) 0%, transparent 70%)',
    certifications: 'radial-gradient(ellipse 50% 40% at 90% 30%, rgba(185,28,28,0.06) 0%, transparent 70%)',
    projects: 'radial-gradient(ellipse 40% 60% at 20% 60%, rgba(220,38,38,0.06) 0%, transparent 70%)',
    education: 'radial-gradient(ellipse 50% 40% at 70% 70%, rgba(185,28,28,0.06) 0%, transparent 70%)',
    contact: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(220,38,38,0.08) 0%, transparent 70%)',
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
            {/* Top hairline separator */}
            <div className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
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
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none hidden lg:flex">
            {visible.map((id) => (
                <button
                    key={id}
                    onClick={(e) => navigateTo(sectionIdMap[id], e)}
                    className="pointer-events-auto group flex items-center gap-2 justify-end bg-transparent border-none cursor-pointer"
                    title={SECTION_BG[id]?.label}
                >
                    <span className={`text-[9px] font-mono uppercase tracking-widest transition-all duration-300
                        ${activeSection === id ? 'text-red-400/80 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}>
                        {SECTION_BG[id]?.label}
                    </span>
                    <div
                        className={`rounded-full transition-all duration-300 ${activeSection === id
                            ? 'w-5 h-2 bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.9)]'
                            : 'w-1.5 h-1.5 bg-white/20 hover:bg-red-500/50'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const HomePage = ({ onReset }) => {
    const [activeSection, setActiveSection] = useState('hero');

    const handleEnter = useCallback((id) => {
        setActiveSection(id);
    }, []);

    return (
        <>
            {/* Animated canvas background — always visible */}
            <AnimatedBackground />

            {/* Fixed color transition layer on top of canvas */}
            <SiteBackground activeSection={activeSection} />

            {/* Side navigation dots */}
            <SectionDots activeSection={activeSection} />

            {/* Active section name watermark */}
            <motion.div
                key={activeSection}
                className="fixed bottom-8 left-8 z-40 pointer-events-none hidden lg:block"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.3em]">
                    // {SECTION_BG[activeSection]?.label}
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
