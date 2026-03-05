
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float, Box, Sphere, Cylinder, MeshDistortMaterial } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from "three";

const Computers = ({ isMobile }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle breathing animation
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            {/* Central "Tech Core" */}
            <mesh ref={meshRef} position={[0, isMobile ? -1 : 0, 0]}>
                <icosahedronGeometry args={[isMobile ? 1.5 : 2.5, 0]} />
                <MeshDistortMaterial
                    color="#2b2b2b"
                    attach="material"
                    distort={0.6} // Increased distortion for "God Level" feel
                    speed={3}
                    wireframe={true}
                />
            </mesh>

            {/* Floating Screens/Cards */}
            <Box args={[3, 2, 0.1]} position={[isMobile ? 0 : 4, isMobile ? 2 : 1, -1]} rotation={[0, -0.5, 0]}>
                <meshStandardMaterial color="#0f0f1a" emissive="#bd00ff" emissiveIntensity={0.8} wireframe />
            </Box>
            <Box args={[3, 2, 0.1]} position={[isMobile ? 0 : -4, isMobile ? -2 : 1, -1]} rotation={[0, 0.5, 0]}>
                <meshStandardMaterial color="#0f0f1a" emissive="#00f3ff" emissiveIntensity={0.8} wireframe />
            </Box>

            {/* Decorative Orbs */}
            <Sphere args={[0.3, 16, 16]} position={[2, 3, 2]}>
                <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={3} />
            </Sphere>
            <Sphere args={[0.3, 16, 16]} position={[-2, -2, 2]}>
                <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={3} />
            </Sphere>

            {/* Connection Lines (Cylinders) */}
            <Cylinder args={[0.02, 0.02, 6, 8]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 6, 8]} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
            </Cylinder>

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#bd00ff" />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
        </Float>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia("(max-width: 500px)").matches;
        }
        return false;
    });

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <Canvas
            frameloop='always'
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 12], fov: 45 }} // Moved camera back slightly
            gl={{ preserveDrawingBuffer: true }}
            className='w-full h-full absolute inset-0 z-[-1]'
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} // Removed pointerEvents: none to allow interaction
        >
            <Suspense fallback={<CanvasLoader />}>
                {/* OrbitControls allow "Scrolling in and out" via zoom if we enable it, but scrolling usually means page scroll. 
            However, user asked for "scrolling in and out".
            Let's enable zoom for manual interaction. 
        */}
                <OrbitControls
                    enableZoom={true} // Enable zoom!
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.8}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
