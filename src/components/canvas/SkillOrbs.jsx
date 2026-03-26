import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';

const SkillOrb = ({ position, color }) => {
    return (
        <Sphere args={[0.28, 8, 8]} position={position}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                roughness={0.5}
                metalness={0.6}
            />
        </Sphere>
    );
};

const SkillOrbsScene = () => {
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });

    const innerOrbs = [
        { color: '#00f3ff' }, { color: '#bd00ff' },
        { color: '#ffffff' }, { color: '#00f3ff' },
    ];
    const outerOrbs = [
        { color: '#bd00ff' }, { color: '#00f3ff' },
        { color: '#ffffff' }, { color: '#bd00ff' },
        { color: '#00f3ff' }, { color: '#ffffff' },
    ];

    return (
        <group ref={groupRef}>
            {innerOrbs.map((orb, i) => {
                const angle = (i / innerOrbs.length) * Math.PI * 2;
                return (
                    <SkillOrb
                        key={'i' + i}
                        position={[Math.cos(angle) * 2, 0, Math.sin(angle) * 2]}
                        color={orb.color}
                    />
                );
            })}
            {outerOrbs.map((orb, i) => {
                const angle = (i / outerOrbs.length) * Math.PI * 2;
                return (
                    <SkillOrb
                        key={'o' + i}
                        position={[Math.cos(angle) * 3.5, 0, Math.sin(angle) * 3.5]}
                        color={orb.color}
                    />
                );
            })}

            {/* Central core — low poly */}
            <Sphere args={[0.5, 8, 8]}>
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} wireframe />
            </Sphere>
        </group>
    );
};

const SkillOrbs = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none">
            <Canvas frameloop="always" camera={{ position: [0, 2, 6], fov: 50 }} dpr={[1, 1.5]}>
                <React.Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.6} color="#bd00ff" />

                    <SkillOrbsScene />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default SkillOrbs;

