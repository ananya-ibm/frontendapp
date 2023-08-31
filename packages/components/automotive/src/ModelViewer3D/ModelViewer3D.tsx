/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';
import { Canvas /* , useFrame */ } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  BakeShadows,
  ContactShadows,
  OrbitControls,
  Float
} from '@react-three/drei';
import { LayerMaterial, Color, Depth } from 'lamina';
import { Model } from './CarModel';
import * as S from './ModelViewer3D.styles';

// Code for automatic camera movement
// Do not delete for now

// function CameraRig({ v = new THREE.Vector3() }) {
//   return useFrame((state) => {
//     const t = state.clock.elapsedTime
//     state.camera.position.lerp(v.set(Math.sin(t / 5), 0, 10 + Math.cos(t / 5)), 0.05)
//     state.camera.lookAt(0, 0, 0)
//   })
// }

type ModelProps = {
  color: string;
  wheelAlloy: [string, string];
  lights: string;
};

type CarDetails = {
  color?: string;
  wheelAlloy?: [string, string];
  lights?: string;
}

export default function ModelViewer3D({ color, wheelAlloy, lights }: ModelProps) {
  const [carDetails, setCarDetails] = useState<CarDetails>({} as CarDetails);
  const goToVRPage = () => {
    window.open(`${window.location.origin}/vr/car/${carDetails.color}/${carDetails.wheelAlloy}/${carDetails.lights}`, '_blank');
  };

  useEffect(() => {
    const obj = {
      color: color || carDetails.color,
      wheelAlloy: wheelAlloy || carDetails.wheelAlloy,
      lights: lights || carDetails.lights
    };

    setCarDetails(obj);
  }, [color, wheelAlloy, lights]);

  return (
    <S.ModelViewer3D>
      <S.VRButton variant="light" onClick={goToVRPage} label="View in VR" />
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[-10, 0, 15]}
            fov={15}
            onUpdate={self => self.lookAt(0, 0, 0)}
          />

          <Model
            scale={1}
            position={[-0.5, -1.125, 0]}
            rotation={[0, Math.PI / 5.5, 0]}
            color={color}
            wheelAlloy={wheelAlloy}
            lights={lights}
          />

          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={0.3}
            shadow-bias={-0.0001}
          />

          <ambientLight intensity={0.1} />

          <ContactShadows
            resolution={512}
            frames={1}
            position={[0.06, -1.12, 0]}
            scale={12}
            blur={3}
            opacity={0.8}
            far={11}
          />

          <Environment frames={Infinity} resolution={256}>
            {/* Ceiling */}
            <Lightformer
              intensity={6}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            {/* Sides */}
            <Lightformer
              intensity={1}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={[20, 0.1, 1]}
            />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
            {/* Accent */}
            <Float speed={5} floatIntensity={0} rotationIntensity={2}>
              <Lightformer
                form="ring"
                color="white"
                intensity={3}
                scale={10}
                position={[-15, 4, -18]}
                target={[0, 0, 0]}
              />
            </Float>
            {/* Background */}
            <mesh scale={100}>
              <sphereGeometry args={[1, 64, 64]} />
              <LayerMaterial side={THREE.BackSide} alphaWrite={undefined}>
                <Color color="#444" alpha={1} mode="normal" />
                <Depth
                  colorA="blue"
                  colorB="black"
                  alpha={0.1}
                  mode="normal"
                  near={0}
                  far={300}
                  origin={[100, 100, 100]}
                />
              </LayerMaterial>
            </mesh>
          </Environment>

          <BakeShadows />
          {/* <CameraRig /> */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </S.ModelViewer3D>
  );
}
