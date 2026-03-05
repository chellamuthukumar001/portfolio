// Replaced Three.js GradientOrbs with pure CSS — no WebGL needed
const GradientOrbs = () => {
    const orbs = [
        { left: '5%', top: '20%', size: 300, color: '#00f3ff', delay: 0, duration: 8 },
        { left: '75%', top: '10%', size: 350, color: '#bd00ff', delay: 2, duration: 10 },
        { left: '40%', top: '60%', size: 250, color: '#ff00bd', delay: 1, duration: 7 },
        { left: '15%', top: '65%', size: 280, color: '#00f3ff', delay: 3, duration: 9 },
        { left: '65%', top: '50%', size: 200, color: '#ff00bd', delay: 1.5, duration: 6 },
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
                        background: `radial-gradient(circle at 40% 40%, ${orb.color}25, ${orb.color}05, transparent 70%)`,
                        filter: 'blur(40px)',
                        animation: `orbDrift ${orb.duration}s ${orb.delay}s ease-in-out infinite alternate`,
                        willChange: 'transform',
                    }}
                />
            ))}
            <style>{`
                @keyframes orbDrift {
                    from { transform: translate(0, 0); }
                    to { transform: translate(30px, -30px); }
                }
            `}</style>
        </div>
    );
};

export default GradientOrbs;
