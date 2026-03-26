
import { FaReact, FaNodeJs, FaPython, FaJava, FaAndroid, FaGithub, FaLinkedin, FaTwitter, FaRobot } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiMongodb, SiFirebase, SiArduino, SiFlutter, SiEspressif, SiSupabase, SiKotlin, SiN8N, SiZapier, SiFigma, SiFramer } from "react-icons/si";
import rforce_ai_project from "../assets/rforce_ai_project.png";
import mindmate_project from "../assets/mindmate_project.png";
import off_grid_project from "../assets/off_grid_project.png";
import lora_monitoring_project from "../assets/lora_monitoring_project.png";

export const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "services", title: "Services" },
  { id: "skills", title: "Skills" },
  { id: "certifications", title: "Certifications" },
  { id: "projects", title: "Projects" },
  { id: "education", title: "Education" },
  { id: "contact", title: "Contact" },
];

export const heroData = {
  name: "Chella Muthu Kumar",
  roles: ["CSE Student", "Web Developer", "UI/UX Designer", "AI Automation"],
  subtitle: "Building modern, interactive web applications, designing clean user experiences, and creating automation workflows.",
};

export const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Python", icon: FaPython, color: "#3776AB" },
  { name: "ESP32", icon: SiEspressif, color: "#E7352C" },
  { name: "Arduino", icon: SiArduino, color: "#00979D" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { name: "n8n", icon: SiN8N, color: "#FF6D5A" },
  { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
  { name: "OpenClaw", icon: FaRobot, color: "#412991" },
  { name: "Manus AI", icon: FaRobot, color: "#FFD700" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Framer", icon: SiFramer, color: "#0055FF" },
];

export const projects = [
  {
    title: "RForce-AI",
    description: "An advanced AI-powered coordination platform for managing volunteer squads and emergency response nexus in real-time.",
    tech: ["React", "Supabase", "n8n", "AI Agents"],
    github: "https://github.com/chellamuthukumar001",
    image: rforce_ai_project,
  },
  {
    title: "Mindmate",
    description: "A premium AI companion designed for mental wellness, featuring conversational intelligence and wellness tracking.",
    tech: ["Flutter", "Kotlin", "FastAPI", "OpenAI"],
    github: "https://github.com/chellamuthukumar001",
    image: mindmate_project,
  },
  {
    title: "Off-Grid Communication App",
    description: "A robust mobile application enabling communication without internet using LoRa technology.",
    tech: ["Flutter", "LoRa", "ESP32", "Dart"],
    github: "https://github.com/chellamuthukumar001",
    image: off_grid_project,
  },
  {
    title: "LoRa Monitoring System",
    description: "Long-range environmental monitoring dashboard visualizing sensor data.",
    tech: ["React", "LoRaWAN", "Chart.js", "InfluxDB"],
    github: "https://github.com/chellamuthukumar001",
    image: lora_monitoring_project,
  },
];

export const education = [
  {
    period: "2023 - Present",
    school: "Nadar Saraswathi College of Engineering and Technology, Theni",
    degree: "B.E in Computer Science and Engineering",
    description: "Focusing on Software Engineering, IoT Systems, and AI Automation.",
  },
  {
    period: "2020 - 2022",
    school: "ZKM Higher Secondary School, Bodinayakanur",
    degree: "HSC",
    description: "Specialized in Computer Science and Mathematics.",
  },
  {
    period: "2010 - 2020",
    school: "ZKM Primary School, Bodinayakanur",
    degree: "SSLC",
    description: "Foundation in science and mathematics.",
  },
];

export const contactInfo = {
  address: "Theni, Tamil Nadu",
  phone: "+91 86818 19529",
  email: "annamayilannamayil32@gmail.com",
};

export const services = [
  {
    title: "Full Stack Development",
    icon: FaReact,
    description: "Building responsive, high-performance web applications using MERN stack and Next.js."
  },
  {
    title: "Mobile App Development",
    icon: SiFlutter,
    description: "Creating cross-platform mobile apps for iOS and Android using Flutter and Dart."
  },
  {
    title: "IoT Solutions",
    icon: SiEspressif,
    description: "Designing smart device networks and embedded systems with ESP32 and LoRa."
  },
  {
    title: "Backend Architecture",
    icon: FaNodeJs,
    description: "Developing scalable APIs and server-side logic with Node.js, Express, and Python."
  },
  {
    title: "AI Automation",
    icon: FaRobot,
    description: "Building intelligent workflows and automating business processes using n8n and Zapier."
  },
  {
    title: "UI/UX Design",
    icon: SiFigma,
    description: "Crafting beautiful, user-centric interfaces and interactive prototypes in Figma and Framer."
  }
];

export const experiences = [
  {
    title: "IoT Engineer Intern",
    company: "Tech Solutions Inc.",
    icon: SiArduino,
    iconBg: "#383E56",
    date: "Jan 2024 - Present",
    points: [
      "Developing firmware for ESP32 microcontrollers for smart home applications.",
      "Implementing MQTT and HTTP protocols for real-time data transmission.",
      "Collaborating with the frontend team to visualize sensor data."
    ],
  },
  {
    title: "Frontend Developer",
    company: "Creative Studio",
    icon: FaReact,
    iconBg: "#E6DEDD",
    date: "Jun 2023 - Dec 2023",
    points: [
      "Built responsive web interfaces using React.js and Tailwind CSS.",
      "Optimized application performance, improving load times by 20%.",
      "Integrated RESTful APIs and ensured cross-browser compatibility."
    ],
  },
];

export const certifications = [
  {
    name: "Advanced React Patterns",
    issuer: "Frontend Masters",
    date: "2023",
    link: "https://www.linkedin.com/in/chellamuthukumar-kumar-4ab4373a0/"
  },
  {
    name: "IoT System Design",
    issuer: "Coursera",
    date: "2022",
    link: "https://www.linkedin.com/in/chellamuthukumar-kumar-4ab4373a0/"
  },
  {
    name: "Flutter Bootcamp",
    issuer: "Udemy",
    date: "2022",
    link: "https://www.linkedin.com/in/chellamuthukumar-kumar-4ab4373a0/"
  }
];

export const socialLinks = [
  { name: "GitHub", icon: FaGithub, link: "https://github.com/chellamuthukumar001" },
  { name: "LinkedIn", icon: FaLinkedin, link: "https://www.linkedin.com/in/chellamuthu-kumar-4ab4373a0" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com" },
];
