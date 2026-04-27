import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { projects } from "../constants";
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaTerminal, FaPlay } from "react-icons/fa";
import Card3D from "./Card3D";

// Distinct dark red gradient backgrounds per project
const cardBgs = [
    "from-red-900/10 via-red-950/5 to-transparent",
    "from-red-800/8 via-red-900/3 to-transparent",
    "from-red-700/6 via-red-800/2 to-transparent",
    "from-red-900/12 via-transparent to-transparent",
];

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="projects" className="relative w-full min-h-screen py-24 bg-transparent overflow-hidden">
            {/* Cinematic gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-0" />

            {/* Static radial glow — no animation loop needed */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 70%)`,
                }}
            />

            {/* Subtle diagonal red lines texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 0, transparent 50%)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                        <span className="text-xs font-mono text-red-500/25 uppercase tracking-[0.3em]">05 / Projects</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-grotesk font-bold mb-4">
                        <span className="text-white">Featured</span>
                        {" "}
                        <span style={{ WebkitTextStroke: "1px rgba(220,38,38,0.4)", color: "transparent" }}>
                            Projects
                        </span>
                    </h2>
                    <p className="text-white/35 text-lg max-w-2xl mx-auto leading-relaxed">
                        Innovative solutions combining cutting-edge web technologies with IoT systems.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            onMouseEnter={() => !isMobile && setHoveredProject(index)}
                            onMouseLeave={() => !isMobile && setHoveredProject(null)}
                            onClick={() => isMobile && setHoveredProject(hoveredProject === index ? null : index)}
                        >
                            <Card3D delay={index * 0.1}>
                                <div className="group relative rounded-2xl border border-red-500/10 bg-[#080808]
                                    hover:border-red-500/30 transition-all duration-400
                                    shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_40px_rgba(220,38,38,0.2)] overflow-hidden"
                                >
                                    {/* Cinematic edge glow on hover */}
                                    {hoveredProject === index && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-[5] pointer-events-none rounded-2xl"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.1), transparent)',
                                            }}
                                        />
                                    )}

                                    {/* Project Visual */}
                                    <div className={`relative h-56 md:h-64 overflow-hidden bg-gradient-to-br ${cardBgs[index % cardBgs.length]}`}>

                                        {/* Background Image */}
                                        {project.image && (
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-500"
                                                    onError={(e) => e.target.style.display = 'none'}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                                            </div>
                                        )}

                                        {/* Large faded index number */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                                            <span className="text-[140px] font-orbitron font-black text-red-600/[0.08] leading-none">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Project Icon block */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                                            <div className="w-16 h-16 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-center shadow-lg">
                                                <FaTerminal className="text-2xl text-red-400/50" />
                                            </div>
                                            <span className="text-red-400/20 text-xs font-mono uppercase tracking-widest font-bold">
                                                {project.tech?.[0] ?? "Project"}
                                            </span>
                                        </div>

                                        {/* Bottom gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

                                        {/* Cinematic hover overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 bg-gradient-to-br from-red-950/70 via-black/60 to-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100
                                            transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20"
                                        >
                                            {/* Play button effect */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: hoveredProject === index ? 1 : 0 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                                className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center
                                                    backdrop-blur-sm shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                                            >
                                                <FaPlay className="text-white/60 text-6xl ml-1" size={24} />
                                            </motion.div>

                                            {/* Action buttons */}
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: hoveredProject === index ? 0 : 20, opacity: hoveredProject === index ? 1 : 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <motion.a
                                                    whileHover={{ scale: 1.08 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg hover:bg-red-500 transition-colors"
                                                >
                                                    <FaGithub /> Code
                                                </motion.a>
                                                <motion.a
                                                    whileHover={{ scale: 1.08 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    href={project.link || project.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-6 py-2.5 border border-white/30 text-white text-sm font-medium rounded-full flex items-center gap-2 backdrop-blur-sm hover:border-white/50 transition-colors"
                                                >
                                                    <FaExternalLinkAlt size={12} /> Demo
                                                </motion.a>
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl md:text-2xl font-grotesk font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/35 leading-relaxed mb-5 text-sm">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="mb-5">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 border border-red-500/10 rounded-lg text-xs text-red-400/50
                                                            hover:border-red-500/30 hover:text-red-400 transition-all font-mono bg-red-500/[0.02]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <motion.a
                                            whileHover={{ x: 4 }}
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-red-500/40
                                                hover:text-red-500 transition-colors group/link font-mono uppercase tracking-widest font-bold"
                                        >
                                            View Details
                                            <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                                        </motion.a>
                                    </div>
                                </div>
                            </Card3D>
                        </motion.div>
                    ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-red-500/25 text-sm mb-6 font-mono">// More projects on GitHub</p>
                    <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        href="https://github.com/chellamuthukumar001"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full
                            shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-all"
                    >
                        <FaGithub size={18} />
                        View All on GitHub
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
