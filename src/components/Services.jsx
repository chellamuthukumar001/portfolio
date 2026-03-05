import { motion } from "framer-motion";
import { services } from "../constants";
import { Tilt } from "react-tilt";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

const Services = () => {
    return (
        <section id="services" className="relative w-full py-24">
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="text-xs font-mono text-white/25 uppercase tracking-[0.3em]">02 / Services</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-grotesk font-bold text-white mb-4">
                        What I{" "}
                        <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
                            Do
                        </span>
                    </h2>
                    <p className="text-white/30 text-sm max-w-md mx-auto">
                        End-to-end engineering across web, mobile, and embedded systems.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service, index) => (
                        <Tilt key={index} options={{ max: 15, scale: 1.03, speed: 400 }} className="flex">
                            <motion.div
                                variants={fadeIn("up", "spring", index * 0.15, 0.6)}
                                className="w-full group cursor-default"
                            >
                                <div className="h-full border border-white/8 rounded-2xl p-7 flex flex-col
                                    bg-[#0a0a0a] hover:bg-[#111] hover:border-white/25
                                    transition-all duration-300 relative overflow-hidden min-h-[260px]">

                                    {/* Index */}
                                    <span className="absolute top-4 right-5 text-[10px] font-mono text-white/10">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Icon container */}
                                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5
                                        group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-300">
                                        <service.icon className="text-xl text-white/60 group-hover:text-black transition-colors" />
                                    </div>

                                    <h3 className="text-white font-orbitron font-bold text-base mb-3 leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/35 text-sm leading-relaxed flex-1">
                                        {service.description}
                                    </p>

                                    {/* Bottom line on hover */}
                                    <div className="h-px mt-5 bg-gradient-to-r from-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400" />
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
