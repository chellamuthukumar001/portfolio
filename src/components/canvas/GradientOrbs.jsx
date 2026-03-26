// Optimised CSS gradient orbs — GPU-composited, minimal blur
const GradientOrbs = () => {
    const orbs = [
        { left: '5%',  top: '15%', size: 220, color: '#00f3ff', delay: 0,   duration: 10 },
        { left: '72%', top: '8%',  size: 250, color: '#bd00ff', delay: 2.5, duration: 13 },
        { left: '38%', top: '62%', size: 180, color: '#ff00bd', delay: 1.2, duration: 11 },
    ];

    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            {orbs.map((orb, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: orb.left,
                        top: orb.top,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 40% 40%, ${orb.color}20, ${orb.color}04, transparent 70%)`,
                        filter: 'blur(20px)',
                        animation: `orbDrift ${orb.duration}s ${orb.delay}s ease-in-out infinite alternate`,
                        willChange: 'transform',
                        contain: 'strict',
                    }}
                />
            ))}
            <style>{`
                @keyframes orbDrift {
                    from { transform: translate3d(0, 0, 0); }
                    to   { transform: translate3d(24px, -24px, 0); }
                }
            `}</style>
        </div>
    );
};

export default GradientOrbs;
