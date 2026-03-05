// Replaced Three.js WebGL canvas with pure CSS for performance
import { useMemo } from 'react';

const ParticleField = () => {
    const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 4,
        tx: (Math.random() - 0.5) * 60,
        ty: (Math.random() - 0.5) * 60,
        color: i % 3 === 0 ? '#00f3ff' : i % 3 === 1 ? '#bd00ff' : 'rgba(255,255,255,0.6)',
    })), []);

    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: p.top,
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                        animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
                        willChange: 'transform, opacity',
                        '--tx': `${p.tx}px`,
                        '--ty': `${p.ty}px`,
                    }}
                />
            ))}
            <style>{`
                @keyframes float {
                    from { opacity: 0.2; transform: translate(0, 0); }
                    to { opacity: 0.8; transform: translate(var(--tx), var(--ty)); }
                }
            `}</style>
        </div>
    );
};

export default ParticleField;
