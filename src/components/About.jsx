import { motion } from "framer-motion";
import { FaLaptopCode, FaMicrochip, FaNetworkWired, FaRocket } from "react-icons/fa";
import profileImg from "../assets/profile.png";
import { SectionTransition } from "./SectionTransition";

// ── Lightweight CSS-only tilt card (no JS tracking) ──────────────────────────
const TiltCard = ({ children, className = "" }) => (
    <div
        className={`tilt-hover-card ${className}`}
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
        {children}
    </div>
);

const About = () => {
    return (
        <section id="about" className="relative w-full min-h-screen py-20 bg-transparent flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center md:text-left"
                >
                    <p className="text-[10px] font-mono text-red-500/60 uppercase tracking-[0.45em] mb-5">// 01 — About</p>

                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6 tracking-tight leading-none">
                        About<br />
                        <span style={{ WebkitTextStroke: "2px rgba(220,38,38,0.55)", color: "transparent" }}>
                            Me.
                        </span>
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-6 w-20 h-[2px] bg-gradient-to-r from-red-500/80 to-transparent origin-left hidden md:block"
                    />

                    <p className="text-white/50 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
                        I am a passionate{" "}
                        <span className="text-red-400 font-semibold border-b border-red-500/40">CSE Student</span>
                        {" "}and{" "}
                        <span className="text-red-400 font-semibold border-b border-red-500/40">Full Stack Developer</span>
                        {" "}with a keen eye for{" "}
                        <span className="text-white/80 font-medium">UI/UX Design</span>.
                        {" "}I specialize in building modern web applications and exploring{" "}
                        <span className="text-white/80 font-medium">AI Automation</span>
                        {" "}to solve complex real-world problems.
                    </p>
                </motion.div>

                <SectionTransition section="about">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* ── Profile Photo Card ── */}
                    <div className="md:col-span-5 lg:col-span-4 h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-full min-h-[420px] rounded-3xl overflow-hidden group border border-white/10 hover:border-red-500/35 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />

                            <img
                                src={profileImg}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1556157382-97eda2d622ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                    e.target.onerror = null;
                                }}
                                alt="Chella Muthu Kumar"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                style={{ filter: 'brightness(1.15) contrast(1.05)' }}
                                loading="lazy"
                            />

                            {/* Live building badge */}
                            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-black/75 border border-red-500/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(220,38,38,0.9)] animate-pulse" />
                                <span className="text-[9px] font-mono text-white/55 uppercase tracking-widest">Currently building</span>
                            </div>

                            {/* Corner badge */}
                            <div className="absolute top-5 right-5 z-20 border border-white/15 rounded-lg px-3 py-1.5 bg-black/60 backdrop-blur-sm">
                                <span className="text-[10px] font-mono text-white/45 uppercase tracking-widest">CSE · 2023</span>
                            </div>

                            {/* Name overlay */}
                            <div className="absolute bottom-8 left-8 z-20">
                                <div className="w-10 h-[2px] bg-red-500 mb-3" />
                                <h3 className="text-2xl font-orbitron font-bold text-white mb-1">Chella Muthu Kumar</h3>
                                <p className="text-white/40 font-mono text-xs tracking-widest uppercase">Developer · Designer</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Bento Grid ── */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Card 1 — Web Dev */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
                            className="md:col-span-2"
                        >
                            <div className="h-full p-7 rounded-3xl border border-white/10
                                bg-[#080808] hover:bg-white/[0.05] hover:border-red-500/25
                                transition-all duration-300 group relative overflow-hidden">
                                {/* Red left accent */}
                                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-500/80 via-red-600/25 to-transparent rounded-l-3xl pointer-events-none" />
                                <div className="absolute -top-8 -right-8 w-32 h-32 bg-red-500/[0.04] rounded-full blur-2xl group-hover:bg-red-500/[0.09] transition-all duration-500 pointer-events-none" />

                                <div className="flex items-start gap-5 relative z-10">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center
                                        group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-300">
                                        <FaLaptopCode className="text-2xl text-white/60 group-hover:text-red-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-orbitron font-bold text-white mb-2">Web Development</h3>
                                        <p className="text-white/38 leading-relaxed text-sm">
                                            Crafting responsive, high-performance web applications using React, Tailwind CSS,
                                            and Modern JavaScript. Focused on clean code and intuitive experiences that feel
                                            genuinely <span className="text-white/65 italic">premium</span>.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 flex gap-2 relative z-10 flex-wrap">
                                    {["React", "Node.js", "TypeScript", "CSS"].map(t => (
                                        <span key={t} className="text-[10px] font-mono text-white/28 border border-white/8 px-2.5 py-1 rounded-lg
                                            hover:border-red-500/30 hover:text-white/50 transition-all duration-200">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 — AI Automation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                        >
                            <div className="h-full p-6 rounded-3xl border border-white/8 bg-black
                                hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300
                                group relative overflow-hidden">
                                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] rounded-3xl pointer-events-none" />

                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <FaMicrochip className="text-lg text-white/70" />
                                </div>
                                <h3 className="text-lg font-orbitron font-bold text-white mb-2">AI Automation</h3>
                                <p className="text-white/35 text-sm leading-relaxed">
                                    Leveraging AI tools to build intelligent workflows and automate complex tasks at scale.
                                </p>
                                <p className="absolute bottom-4 right-5 text-[10px] font-mono text-white/15 uppercase tracking-widest">
                                    LLM · Agents
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3 — UI/UX */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="h-full p-6 rounded-3xl border border-white/8 bg-white/[0.02]
                                hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300
                                group relative overflow-hidden">
                                {/* Dotted texture — moved to pseudo-element via CSS */}
                                <div
                                    className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl"
                                    style={{
                                        backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                                        backgroundSize: "16px 16px",
                                    }}
                                />

                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <FaNetworkWired className="text-lg text-white/70" />
                                </div>
                                <h3 className="text-lg font-orbitron font-bold text-white mb-2">UI/UX Design</h3>
                                <p className="text-white/35 text-sm leading-relaxed">
                                    Designing beautiful, user-centric interfaces with a focus on usability and visual hierarchy.
                                </p>
                                <p className="absolute bottom-4 right-5 text-[10px] font-mono text-white/15 uppercase tracking-widest">
                                    Figma · Motion
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 4 — Learner banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="md:col-span-2"
                        >
                            <div className="w-full p-6 rounded-3xl border border-white/8
                                bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent
                                hover:border-white/20 transition-all duration-300
                                flex items-center justify-between group relative overflow-hidden">

                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                                <div>
                                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-2">// mindset</p>
                                    <h3 className="text-xl font-orbitron font-bold text-white mb-1">Passionate Learner</h3>
                                    <p className="text-white/35 text-sm">
                                        Always exploring new tech stacks and optimizing workflows.
                                    </p>
                                </div>

                                <div className="shrink-0 w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center
                                    group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-110
                                    transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.08)] ml-6">
                                    <FaRocket className="text-xl text-red-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                    </div>
                </SectionTransition>
            </div>
        </section>
    );
};

export default About;
