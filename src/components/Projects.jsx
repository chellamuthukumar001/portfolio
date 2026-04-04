import { motion } from "framer-motion";
import { useState, useEffect, memo, useCallback } from "react";
import { projects } from "../constants";
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaCode } from "react-icons/fa";

const Projects = memo(function Projects() {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleHover = useCallback((index) => {
        if (!isMobile) setHoveredProject(index);
    }, [isMobile]);

    const handleLeave = useCallback(() => {
        if (!isMobile) setHoveredProject(null);
    }, [isMobile]);

    return (
        <section id="projects" className="relative w-full min-h-screen py-16 md:py-24 bg-transparent overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-0" />
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 70%)',
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

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={handleLeave}
                            onClick={() => isMobile && setHoveredProject(hoveredProject === index ? null : index)}
                            className="group"
                        >
                            <div className={`relative rounded-2xl border bg-[#080808] overflow-hidden transition-all duration-300
                                ${hoveredProject === index 
                                    ? "border-red-500/30 shadow-[0_8px_30px_rgba(220,38,38,0.15)]" 
                                    : "border-white/8 hover:border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"}`}
                            >
                                {/* Project Visual */}
                                <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-red-900/10 to-transparent">
                                    {/* Background Image */}
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-25 transition-opacity duration-300"
                                            loading="lazy"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}

                                    {/* Index number */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-[100px] md:text-[120px] font-orbitron font-black text-red-600/[0.06] leading-none">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                                        <div className="w-14 h-14 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center justify-center">
                                            <FaCode className="text-xl text-red-400/50" />
                                        </div>
                                        <span className="text-red-400/30 text-[10px] font-mono uppercase tracking-widest">
                                            {project.tech?.[0] ?? "Project"}
                                        </span>
                                    </div>

                                    {/* Bottom gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

                                    {/* Hover overlay */}
                                    <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20 transition-opacity duration-300
                                        ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="flex items-center gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-full flex items-center gap-2 transition-colors"
                                            >
                                                <FaGithub /> Code
                                            </a>
                                            <a
                                                href={project.link || project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-5 py-2.5 border border-white/30 hover:border-white/50 text-white text-sm font-medium rounded-full flex items-center gap-2 transition-colors"
                                            >
                                                <FaExternalLinkAlt size={11} /> Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-5 md:p-6">
                                    <h3 className="text-lg md:text-xl font-grotesk font-bold text-white mb-2 group-hover:text-red-400/90 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/35 leading-relaxed mb-4 text-sm line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tech.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 border border-red-500/10 rounded-md text-[10px] text-red-400/50 font-mono bg-red-500/[0.02]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="px-2 py-1 text-[10px] text-white/30 font-mono">
                                                +{project.tech.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-xs text-red-500/50 hover:text-red-400 transition-colors font-mono uppercase tracking-wider font-bold group/link"
                                    >
                                        View Details
                                        <FaArrowRight className="text-[10px] group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-16 text-center"
                >
                    <p className="text-red-500/25 text-xs md:text-sm mb-5 font-mono">// More projects on GitHub</p>
                    <a
                        href="https://github.com/chellamuthukumar001"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full
                            shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:shadow-[0_0_35px_rgba(220,38,38,0.4)] transition-all duration-300"
                    >
                        <FaGithub size={16} />
                        View All on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
});

export default Projects;
