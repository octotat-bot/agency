import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Geometries = () => {
    const geometries = useMemo(() => [
        { position: [0, 0, 0], r: 0.3, geometry: new THREE.IcosahedronGeometry(1) }, // Main center
        { position: [1, -0.75, 4], r: 0.4, geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16) }, // Pill
        { position: [-1.4, 2, -4], r: 0.6, geometry: new THREE.DodecahedronGeometry(1.5) }, // Soccer ball
        { position: [-0.8, -0.75, 5], r: 0.5, geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32) }, // Donut
        { position: [1.6, 1.6, -4], r: 0.7, geometry: new THREE.OctahedronGeometry(1.5) }, // Diamond
    ], []);

    const sound = useRef()

    return geometries.map((props, i) => (
        <Geometry key={i} {...props} />
    ));
}

function Geometry({ r, position, geometry, ...props }) {
    const mesh = useRef();
    const data = useMemo(() => ({
        position: new THREE.Vector3(...position),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        random: Math.random(),
    }), [position]);

    useFrame((state) => {
        const { clock, pointer } = state;
        const t = clock.getElapsedTime();

        // Rotate
        mesh.current.rotation.set(
            data.rotation.x + t * 0.1,
            data.rotation.y + t * 0.1,
            data.rotation.z
        );

        // Float slightly
        mesh.current.position.y = data.position.y + Math.sin(t * 0.5 + data.random * 10) * 0.2;

        // Interaction with mouse (subtle)
        mesh.current.rotation.x += (pointer.y * 0.5 - mesh.current.rotation.x) * 0.05;
        mesh.current.rotation.y += (pointer.x * 0.5 - mesh.current.rotation.y) * 0.05;
    });

    return (
        <group position={position} {...props}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh ref={mesh} geometry={geometry}>
                    <meshStandardMaterial
                        color="#8b2942"
                        roughness={0.3}
                        metalness={0.8}
                        emissive="#3a0f1b"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            </Float>
        </group>
    );
}

const Hero3D = () => {
    const [isReady, setIsReady] = useState(false);

    // Delay rendering the 3D canvas to prevent initial lag
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 500); // Wait 500ms after component mount

        return () => clearTimeout(timer);
    }, []);

    // Disable 3D on mobile for better performance
    const isMobile = typeof window !== 'undefined' && (
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
    );

    // Return empty div on mobile or before ready
    if (isMobile || !isReady) {
        return <div className="hero-3d-container hero-3d-container--disabled" />;
    }

    return (
        <div className="hero-3d-container">
            <Canvas camera={{ position: [0, 0, 15], fov: 30 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8b2942" />
                <Geometries />
                <ContactShadows resolution={256} scale={20} blur={2} opacity={0.5} far={10} color="#050505" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};

export default Hero3D;

