// Replaced Three.js FloatingElements with pure CSS glassmorphism shapes
import { useMemo } from 'react';

const FloatingElements = () => {
    const shapes = useMemo(() => [
        { left: '10%', top: '20%', size: 80, color: '#00f3ff', delay: 0, duration: 6 },
        { left: '80%', top: '15%', size: 60, color: '#bd00ff', delay: 1.5, duration: 8 },
        { left: '20%', top: '70%', size: 50, color: '#ffffff', delay: 0.5, duration: 7 },
        { left: '70%', top: '60%', size: 70, color: '#00f3ff', delay: 2, duration: 9 },
        { left: '50%', top: '30%', size: 40, color: '#ff00bd', delay: 1, duration: 5 },
    ], []);

    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            {shapes.map((s, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: s.left,
                        top: s.top,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        borderRadius: i % 2 === 0 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
                        border: `1px solid ${s.color}30`,
                        background: `radial-gradient(circle, ${s.color}10, transparent)`,
                        boxShadow: `0 0 20px ${s.color}20, inset 0 0 20px ${s.color}10`,
                        animation: `floatShape ${s.duration}s ${s.delay}s ease-in-out infinite alternate`,
                        willChange: 'transform',
                    }}
                />
            ))}
            <style>{`
                @keyframes floatShape {
                    from { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                    to { transform: translateY(-20px) rotate(15deg); opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};

export default FloatingElements;
