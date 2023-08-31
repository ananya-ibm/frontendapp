/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  Environment,
  BakeShadows,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';
import { DefaultXRControllers, VRCanvas } from '@react-three/xr';
import React, { Suspense } from 'react';
import { Model } from '@exo/frontend-components-automotive';
import { useParams } from 'react-router';
import * as S from './ModelViewerVR.styles';

export const ModelViewerVR = () => {
  const { color, wheelAlloy, lights }: CarParams = useParams();
  
  return (
    <S.ModelViewerVR>
      <VRCanvas shadows dpr={[1, 2]} className="vr-window">
        <Suspense fallback={null}>
          <color attach="background" args={['white']} />
          <PerspectiveCamera
            makeDefault
            position={[0, 2, 15]}
            fov={20}
            onUpdate={self => self.lookAt(0, 0, 0)}
          />

          <Model
            scale={1}
            position={[0, 0, -5]}
            rotation={[0, Math.PI / 5.5, 0]}
            color={color}
            wheelAlloy={wheelAlloy.split(',')}
            lights={lights}
          />

          <Environment preset="city" />

          <BakeShadows />
          <OrbitControls />
          <DefaultXRControllers />
        </Suspense>
      </VRCanvas>
    </S.ModelViewerVR>
  );
};

type CarParams = {
  color: string;
  wheelAlloy: any;
  lights: string;
}