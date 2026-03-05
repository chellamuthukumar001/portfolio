
import { motion } from "framer-motion";
import { experiences } from "../constants";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { textVariant } from "../utils/motion";

const Experience = () => {
    return (
        <section id="experience" className="relative w-full min-h-screen py-20 bg-transparent">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 z-0" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    variants={textVariant()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-400 font-mono tracking-widest uppercase mb-2">My Journey</p>
                    <h2 className="text-4xl md:text-5xl font-grotesk font-bold text-white mb-6">
                        Work <span className="text-cyan-400">Experience</span>
                    </h2>
                </motion.div>

                <div className="mt-20 flex flex-col">
                    <VerticalTimeline>
                        {experiences.map((experience, index) => (
                            <VerticalTimelineElement
                                key={index}
                                contentStyle={{
                                    background: "#1d1836",
                                    color: "#fff",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                                    borderRadius: "15px"
                                }}
                                contentArrowStyle={{ borderRight: "7px solid  #232631" }}
                                date={experience.date}
                                iconStyle={{ background: experience.iconBg }}
                                icon={
                                    <div className="flex justify-center items-center w-full h-full">
                                        <img
                                            src={experience.icon}
                                            alt={experience.company}
                                            className="w-[60%] h-[60%] object-contain"
                                        />
                                    </div>
                                }
                            >
                                <div>
                                    <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
                                    <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
                                        {experience.company}
                                    </p>
                                </div>

                                <ul className="mt-5 list-disc ml-5 space-y-2">
                                    {experience.points.map((point, index) => (
                                        <li
                                            key={`experience-point-${index}`}
                                            className="text-white-100 text-[14px] pl-1 tracking-wider text-gray-400 hover:text-white transition-colors"
                                        >
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>
        </section>
    );
};

export default Experience;
