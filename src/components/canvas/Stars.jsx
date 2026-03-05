// Replaced Three.js WebGL canvas with pure CSS animation for performance
import { useMemo } from 'react';

const StarsCanvas = () => {
    const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        color: i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#bd00ff' : '#ffffff',
    })), []);

    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            {stars.map(star => (
                <div
                    key={star.id}
                    style={{
                        position: 'absolute',
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        borderRadius: '50%',
                        backgroundColor: star.color,
                        boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                        animation: `starPulse ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
                        willChange: 'opacity',
                    }}
                />
            ))}
            <style>{`
                @keyframes starPulse {
                    from { opacity: 0.2; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
};

export default StarsCanvas;
