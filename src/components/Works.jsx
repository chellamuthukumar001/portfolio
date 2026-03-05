
import React from "react";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "../hoc/SectionWrapper";
import styles from "./Works.module.css";
import { Github } from "lucide-react";
import { Tilt } from "react-tilt"; // Import Tilt

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
            <Tilt
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className={styles.cardTilt} // Wrapper class
            >
                <div className={styles.flipCard}>
                    <div className={styles.flipCardInner}>
                        <div className={styles.flipCardFront}>
                            {/* Image placeholder */}
                            <div
                                className={styles.imagePlaceholder}
                                style={{ background: `linear-gradient(45deg, #111111, #222222)` }}
                            >
                                <span style={{ color: '#a3a3a3', fontSize: '2rem', fontWeight: 'bold' }}>{name}</span>
                            </div>

                            <div className={styles.cardInfoFront}>
                                <div className="flex justify-between items-center w-full">
                                    <p>Hover for details</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.flipCardBack}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.projectName}>{name}</h3>
                                <div
                                    onClick={() => window.open(source_code_link, "_blank")}
                                    className={styles.githubBtn}
                                >
                                    <Github size={20} color="white" />
                                </div>
                            </div>

                            <p className={styles.projectDesc}>{description}</p>

                            <div className={styles.tagsContainer}>
                                {tags.map((tag) => (
                                    <p key={`${name}-${tag.name}`} className={styles.tag} style={{ color: tag.color === "blue-text-gradient" ? "#ffffff" : tag.color === "green-text-gradient" ? "#d4d4d4" : "#a3a3a3" }}>
                                        #{tag.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
};

const Works = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className="sectionSubText">My work</p>
                <h2 className="sectionHeadText">Projects.</h2>
            </motion.div>

            <div className="w-full flex">
                <motion.p
                    variants={fadeIn("", "", 0.1, 1)}
                    className={styles.worksIntro}
                >
                    Following projects showcases my skills and experience through
                    real-world examples of my work. Each project is briefly described with
                    links to code repositories and live demos in it. It reflects my
                    ability to solve complex problems, work with different technologies,
                    and manage projects effectively.
                </motion.p>
            </div>

            <div className={styles.projectsContainer}>
                {projects.map((project, index) => (
                    <ProjectCard key={`project-${index}`} index={index} {...project} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Works, "work");
