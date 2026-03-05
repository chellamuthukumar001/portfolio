import { motion } from "framer-motion";
import { certifications } from "../constants";
import { FaExternalLinkAlt, FaAward, FaShieldAlt } from "react-icons/fa";

const Certifications = () => {
    return (
        <section id="certifications" className="relative w-full py-24 bg-transparent overflow-hidden">
            {/* Deep dark base */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                        <span className="text-xs font-mono text-red-500/25 uppercase tracking-[0.3em]">04 / Certifications</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-4 tracking-tight">
                        Certs &amp;{" "}
                        <span style={{ WebkitTextStroke: "1px rgba(220,38,38,0.3)", color: "transparent" }}>
                            Awards
                        </span>
                    </h2>
                    <p className="text-white/30 text-sm max-w-xl mx-auto font-light">
                        Verified credentials from industry-leading platforms.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative"
                        >
                            <div className="relative h-full rounded-2xl overflow-hidden border border-white/8 bg-[#0a0a0a]
                                hover:border-white/25 hover:bg-[#111] transition-all duration-400
                                shadow-[0_4px_24px_rgba(0,0,0,0.6)]">

                                {/* Left accent border */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-red-500/60 via-red-600/20 to-transparent
                                    group-hover:from-red-500 group-hover:via-red-500/50 transition-all duration-300" />

                                {/* Index number */}
                                <div className="absolute top-5 right-5 text-[10px] font-mono text-white/10 group-hover:text-white/20 transition-colors">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <div className="p-7 pl-8">
                                    {/* Icon */}
                                    <div className="w-11 h-11 rounded-xl border border-red-500/10 bg-red-500/5 flex items-center justify-center mb-5
                                        group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
                                        <FaAward className="text-lg text-red-400 group-hover:text-white transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-white font-orbitron font-bold text-base mb-2 leading-snug group-hover:text-white transition-colors">
                                        {cert.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-1">
                                        <FaShieldAlt className="text-red-500/20 text-xs" />
                                        <p className="text-white/45 text-sm">{cert.issuer}</p>
                                    </div>
                                    <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-6">{cert.date}</p>

                                    {/* Link */}
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-xs font-mono text-white/30
                                            border-b border-white/10 pb-0.5
                                            hover:text-red-400 hover:border-red-500 transition-all duration-200"
                                    >
                                        Verify Credential <FaExternalLinkAlt size={10} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
