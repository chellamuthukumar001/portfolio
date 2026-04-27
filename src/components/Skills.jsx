import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../constants";

const skillCategories = [
    {
        id: "frontend",
        title: "Frontend",
        label: "01",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        description: "Crafting pixel-perfect, responsive interfaces with modern frameworks.",
    },
    {
        id: "backend",
        title: "Backend & DB",
        label: "02",
        skills: ["Node.js", "Supabase", "Firebase", "Python"],
        description: "Building robust server-side architecture and scalable data pipelines.",
    },
    {
        id: "embedded",
        title: "Embedded & IoT",
        label: "03",
        skills: ["ESP32", "Arduino"],
        description: "Programming microcontrollers and designing smart device networks.",
    },
    {
        id: "mobile",
        title: "Mobile & Apps",
        label: "04",
        skills: ["Flutter", "Kotlin", "Java"],
        description: "Shipping cross-platform mobile applications to iOS and Android.",
    },
    {
        id: "automation",
        title: "Automation",
        label: "05",
        skills: ["n8n", "Zapier", "OpenClaw", "Manus AI"],
        description: "Accelerating workflows through intelligent agents and automation pipelines.",
    },
    {
        id: "design",
        title: "Designing Tools",
        label: "06",
        skills: ["Figma", "Framer"],
        description: "Designing visually stunning prototypes and high-fidelity user experiences.",
    },
];

const proficiencyMap = {
    React: 90,
    TypeScript: 80,
    "Tailwind CSS": 85,
    "Node.js": 78,
    Supabase: 82,
    Firebase: 75,
    Python: 82,
    ESP32: 88,
    Arduino: 85,
    Flutter: 76,
    Kotlin: 70,
    Java: 72,
    n8n: 85,
    Zapier: 80,
    OpenClaw: 75,
    "Manus AI": 70,
    Figma: 88,
    Framer: 72,
};

const levelLabel = (pct) => {
    if (pct >= 85) return "Expert";
    if (pct >= 75) return "Advanced";
    if (pct >= 60) return "Intermediate";
    return "Beginner";
};

const SkillCard = ({ skill, index, isActive }) => {
    const pct = proficiencyMap[skill.name] ?? 70;

    return (
        <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative cursor-pointer"
        >
            <div
                className="relative bg-[#0a0a0a] border border-white/8 hover:border-white/40 rounded-2xl p-6 overflow-hidden
                    transition-all duration-300 hover:bg-[#111] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            >
                {/* Top corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/5 group-hover:border-white/40 rounded-br-none rounded-2xl transition-all duration-500" />

                {/* Icon row */}
                <div className="flex items-center gap-4 mb-5">
                    <div className="text-4xl transition-all duration-300 grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110">
                        <skill.icon style={{ color: skill.color }} />
                    </div>
                    <div>
                        <h4 className="text-lg font-orbitron font-bold text-white tracking-wide">
                            {skill.name}
                        </h4>
                        <span className="text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-white/70 transition-colors duration-300">
                            {levelLabel(pct)}
                        </span>
                    </div>
                    <div className="ml-auto text-2xl font-orbitron font-extrabold text-white/10 group-hover:text-white transition-colors duration-300">
                        {pct}%
                    </div>
                </div>

                {/* Proficiency bar */}
                <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${pct}%` : 0 }}
                        transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                            background: `linear-gradient(90deg, #7f1d1d 0%, #ef4444 100%)`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("frontend");

    const current = skillCategories.find((c) => c.id === activeCategory);
    const categorySkills = skills.filter((s) => current.skills.includes(s.name));

    return (
        <section id="skills" className="relative w-full min-h-screen py-24 bg-transparent overflow-hidden">
            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-0 pointer-events-none" />

            {/* Decorative grid lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                        <span className="text-xs font-mono text-red-500/30 uppercase tracking-[0.3em]">02 / Skills</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-center mb-6 tracking-tight">
                        <span className="text-white">Skills &nbsp;</span>
                        <span
                            className="relative inline-block"
                            style={{
                                WebkitTextStroke: "1px rgba(220,38,38,0.4)",
                                color: "transparent",
                            }}
                        >
                            Expertise
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent origin-left"
                            />
                        </span>
                    </h2>
                    <p className="text-white/40 text-center text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        A precision-engineered toolkit spanning full-stack, embedded, and mobile —
                        continuously upgraded for bleeding-edge projects.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {skillCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative px-6 py-3 rounded-full font-orbitron text-sm tracking-wider transition-all duration-300 outline-none border
                                ${activeCategory === cat.id
                                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                    : "bg-transparent text-white/50 border-white/10 hover:border-red-500/40 hover:text-white/80"
                                }`}
                        >
                            <span className="mr-2 font-mono text-[10px] opacity-50">{cat.label}</span>
                            {cat.title}
                        </button>
                    ))}
                </motion.div>

                {/* Category Description */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + "-desc"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-10"
                    >
                        <p className="text-white/30 text-sm font-mono tracking-widest uppercase">
                            — {current.description} —
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Skills Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {categorySkills.map((skill, index) => (
                            <SkillCard
                                key={skill.name}
                                skill={skill}
                                index={index}
                                isActive={true}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Overall skill meter strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 border border-white/8 rounded-2xl p-8 bg-[#080808]"
                >
                    <p className="text-xs font-mono text-white/20 uppercase tracking-[0.25em] mb-6 text-center">
                        // Full spectrum overview
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                        {skills.map((skill, i) => (
                            <div key={skill.name} className="flex items-center gap-4">
                                <span className="w-28 text-xs font-mono text-white/40 text-right shrink-0">{skill.name}</span>
                                <div className="flex-1 h-px bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${proficiencyMap[skill.name] ?? 70}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="absolute top-0 left-0 h-full bg-white/40"
                                    />
                                </div>
                                <span className="text-xs font-mono text-white/20 w-8">{proficiencyMap[skill.name] ?? 70}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer caption */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-white/15 text-xs font-mono tracking-[0.3em] uppercase"
                >
                    // System version: 2025 build — continuously upgrading
                </motion.p>

            </div>
        </section>
    );
};

export default Skills;
