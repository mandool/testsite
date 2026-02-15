import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
    const { scene } = useGLTF(url);
    const group = useRef();

    useFrame((state) => {
        // 마우스 위치에 따라 모델을 미세하게 기울임 (Parallax 효과)
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + state.mouse.y / 10, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10 + state.mouse.x / 10, 0.1);
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (1 + Math.sin(t / 1.5)) / 10, 0.1);
    });

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    );
}

const Scene = () => {
    // userControlZoom 변수가 정의되지 않아 임시로 true로 설정합니다.
    const userControlZoom = true;

    return (
        <div className="canvas-container">
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ height: '100%', width: '100%' }}
            >
                <ambientLight intensity={1.5} /> {/* 환경광 강도 강화 */}
                <directionalLight position={[5, 5, 5]} intensity={2} castShadow /> {/* 방향광 추가 */}
                <pointLight position={[-5, 5, -5]} intensity={1.5} color="#007aff" /> {/* 포인트 조명으로 입체감 부여 */}

                <Suspense fallback={null}>
                    <Stage environment="city" intensity={1} contactShadow={{ opacity: 0.5, blur: 2 }}>
                        <Model url="/testd.glb" />
                    </Stage>
                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        enableZoom={userControlZoom}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                    <Environment preset="city" /> {/* 더 밝은 시티 프리셋으로 변경 */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
