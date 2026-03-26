import { motion } from "framer-motion";
import { services } from "../constants";
import { Tilt } from "react-tilt";

const Services = () => {
    return (
        <section id="services" className="relative w-full py-28 overflow-hidden">

            {/* Section glow top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <p className="text-[10px] font-mono text-red-500/60 uppercase tracking-[0.45em] mb-5">
                        // 02 — Services
                    </p>
                    <h2 className="text-5xl md:text-7xl font-grotesk font-bold text-white mb-5 leading-none">
                        What I{" "}
                        <span style={{ WebkitTextStroke: "2px rgba(220,38,38,0.55)", color: "transparent" }}>
                            Deliver
                        </span>
                    </h2>
                    <p className="text-white/28 text-sm max-w-sm mx-auto font-light tracking-wide">
                        End-to-end engineering across web, mobile, and embedded systems.
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent origin-center"
                    />
                </motion.div>

                {/* Cards — 3 columns on lg */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <Tilt key={index} options={{ max: 14, scale: 1.03, speed: 350 }} className="flex">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                                className="w-full group cursor-default"
                            >
                                <div className="h-full border border-white/8 rounded-3xl p-7 flex flex-col
                                    bg-[#090909] relative overflow-hidden min-h-[240px]
                                    hover:border-red-500/30 transition-all duration-400">

                                    {/* Number watermark */}
                                    <span className="absolute top-5 right-6 text-[40px] font-orbitron font-black text-white/[0.025] leading-none select-none pointer-events-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    {/* Top accent bar — animated in on hover */}
                                    <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full
                                        bg-gradient-to-r from-transparent via-red-500/0 to-transparent
                                        group-hover:via-red-500/60 transition-all duration-500" />

                                    {/* Left accent bar */}
                                    <div className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full
                                        bg-gradient-to-b from-transparent via-red-500/0 to-transparent
                                        group-hover:via-red-500/40 transition-all duration-500" />

                                    {/* Background glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0
                                        group-hover:from-red-500/[0.04] group-hover:to-transparent
                                        transition-all duration-500 rounded-3xl" />

                                    {/* Icon */}
                                    <div className="relative z-10 w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-6
                                        group-hover:border-red-500/40 group-hover:bg-red-500/8 transition-all duration-300">
                                        <service.icon className="text-xl text-white/55 group-hover:text-red-400 transition-colors duration-300" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="relative z-10 text-white font-orbitron font-bold text-base mb-3 leading-tight
                                        group-hover:text-white transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="relative z-10 text-white/32 text-sm leading-relaxed flex-1">
                                        {service.description}
                                    </p>

                                    {/* Bottom hover line */}
                                    <motion.div
                                        className="relative z-10 h-px mt-6 bg-gradient-to-r from-red-500/50 via-red-400/30 to-transparent origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.35 }}
                                    />
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>

            {/* Section glow bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)" }} />
        </section>
    );
};

export default Services;
