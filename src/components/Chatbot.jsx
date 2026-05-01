import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FaBrain, FaTimes, FaPaperPlane, FaRobot, FaBolt, FaCode, FaEnvelope, FaMicrophone, FaTerminal, FaShieldAlt, FaArrowsAlt } from 'react-icons/fa';

import { heroData, skills, projects, experiences, education, services, certifications, socialLinks } from '../constants';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: "LUNA_SYSTEM_CORE v3.8 // KINETIC_LINK_ACTIVE. I am now mobile. Drag me by the header to reposition my console." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const dragControls = useDragControls();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleMouseMove = (e) => {
        if (!chatContainerRef.current) return;
        const rect = chatContainerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const quickActions = [
        { label: "Technical DNA", icon: <FaBolt />, query: "What are Chella's core technical skills?" },
        { label: "Project Forge", icon: <FaCode />, query: "Tell me about his top 3 projects." },
        { label: "Neural Links", icon: <FaEnvelope />, query: "How can I contact Chella?" },
        { label: "Experience Log", icon: <FaTerminal />, query: "Give me a summary of his work experience." },
    ];

    const generateSystemPrompt = () => {
        const skillsList = skills.map(s => s.name).join(', ');
        const projectsList = projects.map(p => `${p.title} (${p.tech.join(', ')}): ${p.description}`).join('. ');
        const experienceList = experiences.map(e => `${e.title} at ${e.company} (${e.date}): ${e.points.join(' ')}`).join('. ');

        return `You are "Luna", Chella's mobile AI Core. 
        Your tone is "Cyberpunk Professional". 
        Use markdown for lists and bold text.
        Context: ${heroData.name}, ${heroData.roles.join(', ')}, ${heroData.subtitle}.
        Skills: ${skillsList}.
        Projects: ${projectsList}.
        Experience: ${experienceList}.
        `;
    };

    const handleSend = async (queryInput = input) => {
        const query = typeof queryInput === 'string' ? queryInput : input;
        if (!query.trim()) return;

        const userMessage = { role: 'user', content: query };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Luna Kinetic AI'
                },
                body: JSON.stringify({
                    model: 'openrouter/auto',
                    messages: [
                        { role: 'system', content: generateSystemPrompt() },
                        ...messages.slice(1).map(m => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.content })),
                        { role: 'user', content: query }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { role: 'model', content: data.choices[0].message.content }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: "SIGNAL_INTERRUPTED. Neural grid busy." }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'model', content: "FATAL_ERROR: Connection failed." }]);
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[1000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatContainerRef}
                        onMouseMove={handleMouseMove}
                        drag
                        dragControls={dragControls}
                        dragMomentum={false}
                        dragListener={false}
                        initial={{ opacity: 0, scale: 0.9, y: 100, x: window.innerWidth - 450 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: window.innerWidth - 450 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className="pointer-events-auto absolute w-[400px] h-[650px] bg-[#050505] border border-red-500/20 rounded-[2.5rem] shadow-[0_0_80px_rgba(239,68,68,0.2)] flex flex-col overflow-hidden backdrop-blur-3xl"
                        style={{ bottom: '100px', right: 'auto' }}
                    >
                        {/* Interactive Background Matrix */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <motion.div
                                className="absolute w-[250px] h-[250px] bg-red-600/10 rounded-full blur-[80px]"
                                animate={{ x: mousePos.x - 125, y: mousePos.y - 125 }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            />
                            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                        </div>

                        {/* DRAGGABLE HEADER */}
                        <div
                            onPointerDown={(e) => dragControls.start(e)}
                            className="relative z-10 p-6 bg-gradient-to-b from-red-600/10 to-transparent border-b border-red-500/10 flex flex-col cursor-grab active:cursor-grabbing"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white">
                                            <FaRobot className="text-2xl" />
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full blur-[2px]"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-orbitron font-black text-sm tracking-widest text-white">LUNA_MOBILE</h3>
                                            <FaArrowsAlt size={10} className="text-red-500/40" />
                                        </div>
                                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-tighter mt-1">Repositionable Interface</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-red-500/20 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all border border-transparent hover:border-red-500/30">
                                    <FaTimes size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Kinetic Status Bar */}
                        <div className="relative z-10 px-7 py-3 flex justify-between items-center border-b border-red-500/5 bg-red-600/5">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[8px] font-mono text-white/30 uppercase">Uptime: 99.9%</span>
                                </div>
                                <span className="text-[8px] font-mono text-white/30 uppercase">Link: AES-GCM</span>
                            </div>
                            <motion.div
                                animate={{ x: [0, 50, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="text-[8px] font-mono text-red-500/40 uppercase tracking-widest whitespace-nowrap"
                            >
                                [ MOVING_SYSTEM_SYNC ]
                            </motion.div>
                        </div>

                        {/* Scrollable Message Feed */}
                        <div className="flex-1 overflow-y-auto p-7 space-y-6 custom-scrollbar relative z-10">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-5 py-4 rounded-[2rem] text-[13px] leading-relaxed shadow-xl backdrop-blur-md border ${msg.role === 'user'
                                        ? 'bg-red-600 text-white rounded-tr-none border-red-500/50 shadow-red-900/20'
                                        : 'bg-white/5 text-gray-200 rounded-tl-none border-white/10 font-mono'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {messages.length === 1 && (
                                <div className="grid grid-cols-1 gap-2">
                                    {quickActions.map((action, i) => (
                                        <motion.button
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            onClick={() => handleSend(action.query)}
                                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-red-600/10 hover:border-red-500/40 transition-all text-left group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                                {action.icon}
                                            </div>
                                            <span className="text-[10px] font-mono text-white/40 group-hover:text-white uppercase tracking-widest">{action.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3], x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="bg-red-600/10 border border-red-500/20 px-6 py-4 rounded-3xl rounded-tl-none flex items-center gap-3"
                                    >
                                        <FaTerminal className="text-red-500 animate-pulse" />
                                        <span className="text-[9px] font-mono text-red-500/80 uppercase tracking-widest">Compiling Response...</span>
                                    </motion.div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Shield */}
                        <div className="p-7 bg-black/80 border-t border-red-500/10 relative z-10 backdrop-blur-md">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Execute Protocol..."
                                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-6 pr-14 py-5 text-sm font-mono text-white focus:outline-none focus:border-red-500/50 transition-all placeholder:text-white/10"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 hover:bg-red-500 text-white rounded-xl disabled:opacity-30 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
                                >
                                    <FaPaperPlane size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING TOGGLE BUTTON */}
            <motion.div
                className="fixed bottom-8 right-8 pointer-events-auto"
                animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative group">
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute top-1/2 -left-36 -translate-y-1/2 bg-red-600 text-white text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] shadow-lg pointer-events-none"
                            >
                                Interface_Online
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.15, boxShadow: "0 0 40px rgba(0,170,255,0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-18 h-18 rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl border transition-all duration-700 ${isOpen
                            ? 'bg-black border-red-500 text-red-500'
                            : 'bg-gradient-to-br from-red-600 to-red-950 border-white/20'
                            }`}
                    >
                        <FaBrain className={`text-4xl transition-transform duration-700 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0'}`} />
                        {isOpen && <FaTimes className="text-3xl absolute" />}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Chatbot;

