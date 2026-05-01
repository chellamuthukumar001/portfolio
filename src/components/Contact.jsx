import { motion } from "framer-motion";
import { socialLinks, contactInfo } from "../constants";
import { FaPaperPlane, FaSpinner, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useState, useRef } from "react";

const Contact = ({ compact = false }) => {
    const formRef = useRef();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFocus = (field) => setFocused(field);
    const handleBlur = () => setFocused(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            // STEP 1: CREATE A FORM ON FORMSPREE.IO
            // STEP 2: REPLACE 'xpzeodpk' BELOW WITH YOUR FORM ID
            const FORMSPREE_ID = "xykngkbv";

            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _subject: `Portfolio Inquiry from ${form.name}`
                })
            });

            if (response.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch (err) {
            console.error("Submission failed:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const fieldClass = (field) =>
        `w-full bg-black/60 border rounded-xl px-4 py-3 text-white placeholder-white/20
        outline-none transition-all duration-200 font-light text-sm
        ${focused === field
            ? "border-red-500/60 shadow-[0_0_0_1px_rgba(0,170,255,0.2)]"
            : "border-white/10 hover:border-red-500/30"
        }`;

    return (
        <section id="contact" className={`relative w-full ${compact ? "py-10" : "min-h-screen py-24"} bg-transparent flex items-center overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

            {/* Corner accent lights */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/[0.03] rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-600/[0.03] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                        <span className="text-xs font-mono text-white/25 uppercase tracking-[0.3em]">08 / Contact</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-grotesk font-bold text-white mb-3">
                        Let's Work{" "}
                        <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>
                            Together
                        </span>
                    </h2>
                    <p className="text-white/30 text-sm max-w-md mx-auto">
                        Have a project in mind? Drop a message and let's build something great.
                    </p>
                </motion.div>

                {/* Main container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="grid md:grid-cols-5 gap-0 border border-white/8 rounded-3xl overflow-hidden
                        shadow-[0_24px_64px_rgba(0,0,0,0.8)] bg-[#060606]"
                >
                    {/* â”€â”€ Left Info Panel â”€â”€ */}
                    <div className="md:col-span-2 p-8 border-b md:border-b-0 md:border-r border-white/8
                        bg-white/[0.02] flex flex-col justify-between gap-8">

                        <div>
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-6">// Contact Info</p>

                            {/* Available badge */}
                            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl border border-white/8 bg-black/40">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80] shrink-0" />
                                <span className="text-white/50 text-sm">Available for new projects</span>
                            </div>

                            {/* Info blocks */}
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg border border-red-500/10 bg-red-500/5 flex items-center justify-center shrink-0 mt-0.5">
                                        <FaMapMarkerAlt className="text-red-400 text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-red-400/30 uppercase tracking-wider mb-1 font-bold">Location</p>
                                        <p className="text-white/70 text-sm">{contactInfo.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg border border-red-500/10 bg-red-500/5 flex items-center justify-center shrink-0 mt-0.5">
                                        <FaEnvelope className="text-red-400 text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-red-400/30 uppercase tracking-wider mb-1 font-bold">Email</p>
                                        <a href={`mailto:${contactInfo.email}`} className="text-white/70 text-sm font-mono hover:text-red-400 transition-colors">
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg border border-red-500/10 bg-red-500/5 flex items-center justify-center shrink-0 mt-0.5">
                                        <FaPhoneAlt className="text-red-400 text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-red-400/30 uppercase tracking-wider mb-1 font-bold">Phone</p>
                                        <a href={`tel:${contactInfo.phone}`} className="text-white/70 text-sm font-mono hover:text-red-400 transition-colors">
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div>
                            <p className="text-[10px] font-mono text-white/15 uppercase tracking-[0.2em] mb-4">// Find me on</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-xl border border-white/10 bg-black/40
                                            flex items-center justify-center text-white/30
                                            hover:border-white/40 hover:text-white hover:bg-white/10
                                            transition-all duration-200"
                                    >
                                        <social.icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* â”€â”€ Right Form Panel â”€â”€ */}
                    <div className="md:col-span-3 p-8">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.25em] mb-6">// Send a message</p>

                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {[
                                { field: "name", type: "text", placeholder: "Your name" },
                                { field: "email", type: "email", placeholder: "your@email.com" },
                            ].map(({ field, type, placeholder }) => (
                                <div key={field}>
                                    <label className="text-[10px] font-mono text-white/25 uppercase tracking-widest block mb-1.5">
                                        {field}
                                    </label>
                                    <input
                                        type={type}
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus(field)}
                                        onBlur={handleBlur}
                                        placeholder={placeholder}
                                        required
                                        className={fieldClass(field)}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="text-[10px] font-mono text-white/25 uppercase tracking-widest block mb-1.5">
                                    message
                                </label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus("message")}
                                    onBlur={handleBlur}
                                    placeholder="Tell me about your project..."
                                    required
                                    className={`${fieldClass("message")} resize-none`}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status !== "idle"}
                                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                className={`
                                    w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300
                                    flex items-center justify-center gap-2 mt-2
                                    ${status === "success"
                                        ? "bg-green-500/10 border border-green-500/30 text-green-400"
                                        : status === "error"
                                            ? "bg-red-900/40 border border-red-500/50 text-red-100"
                                            : "bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_0_30px_rgba(0,170,255,0.5)]"
                                    }
                                    disabled:cursor-not-allowed
                                `}
                            >
                                {status === "sending" ? (
                                    <FaSpinner className="animate-spin" />
                                ) : status === "success" ? (
                                    <><FaCheckCircle /> Message Sent!</>
                                ) : status === "error" ? (
                                    <><FaExclamationCircle /> Connection Error</>
                                ) : (
                                    <><FaPaperPlane /> Send Message</>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

