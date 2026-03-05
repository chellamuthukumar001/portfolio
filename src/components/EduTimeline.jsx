import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { education } from "../constants";
import {
    FaGraduationCap,
    FaBookOpen,
    FaTrophy,
    FaMicrochip,
    FaCode,
    FaChevronDown,
} from "react-icons/fa";

// Richer education data (augments the constants)
const EduTimeline = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggle = (idx) =>
        setExpandedIndex((prev) => (prev === idx ? null : idx));

    // Process education data for rendering
    const enhancedEducation = education.map((edu, index) => ({
        ...edu,
        icon: index === 0 ? FaGraduationCap : index === 1 ? FaTrophy : FaBookOpen,
        status: edu.period.includes("Present") ? "Ongoing" : "Completed",
        gpa: index === 0 ? "—" : index === 1 ? "Top %" : "—",
        highlights: [edu.description],
        courses: index === 0 ? ["IoT", "Web", "AI"] : ["CS", "Maths", "Science"]
    }));

    return (
        <section
            id="education"
            className="relative w-full min-h-screen py-24 bg-transparent overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

            {/* Red accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                        <span className="text-xs font-mono text-white/25 uppercase tracking-[0.3em]">
                            07 / Education
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    </div>

                    <h2 className="text-5xl md:text-6xl font-grotesk font-bold text-white mb-4">
                        Education
                        <br />
                        <span
                            style={{
                                WebkitTextStroke: "1px rgba(220,38,38,0.5)",
                                color: "transparent",
                            }}
                        >
                            Journey
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {enhancedEducation.map((edu, index) => (
                        <div key={index} className="relative group pl-10 md:pl-0">
                            {/* Vertical Line */}
                            {index !== enhancedEducation.length - 1 && (
                                <div className="absolute left-[23px] top-10 bottom-0 w-[1px] bg-gradient-to-b from-red-500/30 to-transparent z-0" />
                            )}

                            {/* Node */}
                            <div className="absolute left-0 top-0 z-10">
                                <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 bg-black ${expandedIndex === index ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'border-white/10'}`}>
                                    <edu.icon className={expandedIndex === index ? 'text-red-500' : 'text-white/30'} />
                                </div>
                            </div>

                            <div className="pl-16 pb-12">
                                <motion.div
                                    layout
                                    onClick={() => toggle(index)}
                                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${expandedIndex === index ? 'bg-white/[0.03] border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.05)]' : 'bg-black border-white/5 hover:border-red-500/20'}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-2 block">{edu.period}</span>
                                            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{edu.school}</h3>
                                            <p className="text-sm text-white/40">{edu.degree}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-mono border ${edu.status === 'Ongoing' ? 'border-red-500/50 text-red-400 bg-red-400/10 animate-pulse' : 'border-white/10 text-white/30'}`}>
                                            {edu.status}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 border-t border-white/5 mt-4 space-y-4">
                                                    <div>
                                                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-2">// Description</p>
                                                        <p className="text-sm text-white/60 leading-relaxed">{edu.description}</p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {edu.courses.map(course => (
                                                            <span key={course} className="text-[10px] font-mono px-2 py-1 rounded bg-red-500/5 border border-red-500/10 text-red-400/80">
                                                                {course}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-3 text-white/10 text-[10px] font-mono tracking-[0.3em] uppercase">
                        <div className="h-px w-8 bg-white/5" />
                        innovation through learning
                        <div className="h-px w-8 bg-white/5" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EduTimeline;
