import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 깃허브 배포 경로를 자동으로 맞춰주는 변수를 만듭니다.
const MODEL_URL = `${import.meta.env.BASE_URL}testd.glb`;

function Model({ url }) {
    const { scene } = useGLTF(url);
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + state.mouse.y / 10, 0.1);
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10 + state.mouse.x / 10, 0.1);
            group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (1 + Math.sin(t / 1.5)) / 10, 0.1);
        }
    });

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    );
}

const Scene = () => {
    const userControlZoom = true;

    return (
        <div className="canvas-container">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ height: '100%', width: '100%' }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
                <pointLight position={[-5, 5, -5]} intensity={1.5} color="#007aff" />

                <Suspense fallback={null}>
                    <Stage environment="city" intensity={1} contactShadow={{ opacity: 0.5, blur: 2 }}>
                        {/* ✅ 수정한 부분: 일반 경로 대신 MODEL_URL 변수를 사용합니다. */}
                        <Model url={MODEL_URL} />
                    </Stage>
                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        enableZoom={userControlZoom}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;