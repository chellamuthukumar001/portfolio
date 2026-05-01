
import { FaHeart, FaArrowUp } from "react-icons/fa";

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="w-full py-8 border-t border-red-500/15 text-center relative"
            style={{ backgroundColor: "#000000" }}>

            {/* Red glow top edge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/30 text-sm flex items-center gap-1.5 group cursor-default">
                    Made with{" "}
                    <FaHeart className="text-red-500 group-hover:scale-125 transition-transform animate-pulse" />{" "}
                    by{" "}
                    <span className="text-white font-bold hover:text-red-400 transition-colors font-orbitron">
                        Chella Muthu Kumar
                    </span>
                </p>

                <p className="text-white/15 text-xs font-mono">
                    &copy; {new Date().getFullYear()} Â· All rights reserved
                </p>

                <button
                    onClick={scrollToTop}
                    className="p-3 bg-red-500/10 border border-red-500/30 rounded-full text-red-400
                        hover:bg-red-600 hover:border-red-500 hover:text-white
                        transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(0,170,255,0.1)]
                        hover:shadow-[0_0_20px_rgba(0,170,255,0.4)]"
                    aria-label="Back to top"
                >
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;

