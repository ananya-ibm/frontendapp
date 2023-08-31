/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useMemo } from 'react';
import { applyProps } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type CarModelProps = {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  wheelAlloy: [string, string];
  lights: string;
};

type GLTFResult = GLTF & {
    nodes: {
        Pyramid: THREE.Mesh;
    };
    materials: {
        ['default']: THREE.MeshStandardMaterial;
    };
}

export const Model = ({ scale, position, rotation, color, wheelAlloy, lights }: CarModelProps) => {
  const { scene, nodes, materials } = useGLTF('/static/3d-car-models/delorean.glb') as GLTFResult;

  useEffect(() => {
    applyProps((materials as any).outerColor, {
      color
    });
  }, [color]);

  useEffect(() => {
    applyProps((materials as any).headLights, {
      emissive: lights,
      emissiveIntensity: 0.2
    });
  }, [lights]);

  useEffect(() => {
    if (wheelAlloy) {
      Object.keys(nodes).forEach(key => {
        if (key.toLowerCase().includes('wheel'))
          nodes[key].visible = false;
      })
      nodes[wheelAlloy[0]].visible = true;
      nodes[wheelAlloy[1]].visible = true;
    }
  }, [wheelAlloy]);

  useMemo(() => {
    Object.values(nodes).forEach((node: any) => {
      const currNode = node;
      currNode.receiveShadow = true;
      currNode.castShadow = true;
      const toReturn = node.isMesh && node.receiveShadow === node.castShadow;
      return toReturn;
    });
  }, [nodes, materials]);

  return <primitive object={scene} {...{ scale, position, rotation, color }} />;
}

useGLTF.preload('/static/3d-car-models/delorean.glb');
