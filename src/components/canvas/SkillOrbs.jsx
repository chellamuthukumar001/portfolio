import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';

const SkillOrb = ({ position, color, delay = 0 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime + delay;
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={meshRef} position={position}>
                <Sphere args={[0.3, 16, 16]}>
                    <MeshDistortMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.8}
                        distort={0.2}
                        speed={2}
                        roughness={0.4}
                        metalness={0.8}
                    />
                </Sphere>
            </group>
        </Float>
    );
};

const OrbitalRing = ({ radius, orbs }) => {
    return (
        <group>
            {orbs.map((orb, index) => {
                const angle = (index / orbs.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <SkillOrb
                        key={index}
                        position={[x, 0, z]}
                        color={orb.color}
                        name={orb.name}
                        delay={index * 0.2}
                    />
                );
            })}
        </group>
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
        { name: 'React', color: '#00f3ff' },
        { name: 'Flutter', color: '#bd00ff' },
        { name: 'IoT', color: '#ffffff' },
        { name: 'Embedded', color: '#00f3ff' },
    ];

    const outerOrbs = [
        { name: 'JS', color: '#bd00ff' },
        { name: 'Python', color: '#00f3ff' },
        { name: 'C++', color: '#ffffff' },
        { name: 'Node', color: '#bd00ff' },
        { name: 'Firebase', color: '#00f3ff' },
        { name: 'MongoDB', color: '#ffffff' },
    ];

    return (
        <group ref={groupRef}>
            <OrbitalRing radius={2} orbs={innerOrbs} />
            <OrbitalRing radius={3.5} orbs={outerOrbs} />

            {/* Central core */}
            <Sphere args={[0.5, 32, 32]}>
                <MeshDistortMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={1}
                    distort={0.4}
                    speed={3}
                    wireframe
                />
            </Sphere>
        </group>
    );
};

const SkillOrbs = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
                <React.Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#bd00ff" />

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
