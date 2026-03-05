
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Sphere, MeshDistortMaterial } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
    return (
        <Sphere args={[1, 32, 32]} scale={2.5}>
            <MeshDistortMaterial
                color="#00d4ff" // Bright cyan
                emissive="#00f3ff" // Cyan glow
                emissiveIntensity={0.8}
                distort={0.4}
                speed={2}
                wireframe
            />
        </Sphere>
    );
};

const EarthCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='always'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true, alpha: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    autoRotateSpeed={1}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Earth />
                <Preload all />
            </Suspense>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00f3ff" />
        </Canvas>
    );
};

export default EarthCanvas;
