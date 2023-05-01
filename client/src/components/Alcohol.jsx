/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 alcohol.gltf --transform
Author: shuvalov.di (https://sketchfab.com/shuvalov.di)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/small-bottle-761e522abb934b0a98063a9851728180
Title: Small bottle
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/alcohol-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.26}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.Sklianka__0.geometry} material={materials['Scene_-_Root']} position={[0.03, 34.37, 0.1]} rotation={[-Math.PI / 2, 0, 0]} scale={449.69} />
          <mesh geometry={nodes.Remny__0.geometry} material={materials['Scene_-_Root']} position={[0.28, 38.37, -0.04]} scale={[0.36, 0.35, 0.36]} />
          <mesh geometry={nodes.Fiksator__0.geometry} material={materials['Scene_-_Root']} position={[-11.67, 63.66, -7.05]} rotation={[-Math.PI, -1.03, -Math.PI / 2]} scale={25.23} />
          <mesh geometry={nodes.Klepka002__0.geometry} material={materials['Scene_-_Root']} position={[5.52, 57.4, -8.15]} rotation={[Math.PI, 0.6, 0]} scale={23.04} />
          <mesh geometry={nodes.Klepka003__0.geometry} material={materials['Scene_-_Root']} position={[8.22, 57.4, 5.42]} rotation={[0, 0.98, -Math.PI]} scale={23.04} />
          <mesh geometry={nodes.Klepka004__0.geometry} material={materials['Scene_-_Root']} position={[-5.6, 57.4, 8.1]} rotation={[0, -0.61, Math.PI]} scale={23.04} />
          <mesh geometry={nodes.Klepka005__0.geometry} material={materials['Scene_-_Root']} position={[-9.29, 57.56, -6.26]} rotation={[-3.08, -0.95, 0.05]} scale={23.04} />
          <mesh geometry={nodes.Kolco__0.geometry} material={materials['Scene_-_Root']} position={[-13.84, 63.37, -8.1]} rotation={[-2.23, -0.8, -1.13]} scale={61.15} />
          <mesh geometry={nodes.Remeshok__0.geometry} material={materials['Scene_-_Root']} position={[-23.73, 37.49, -14.34]} rotation={[-0.02, 0, 0.02]} scale={0.12} />
          <mesh geometry={nodes.Probka__0.geometry} material={materials['Scene_-_Root']} position={[-0.21, 67.85, 0.21]} rotation={[-1.52, -0.06, 1.26]} scale={[437.64, 437.64, 449.69]} />
          <mesh geometry={nodes.Klepka__0.geometry} material={materials['Scene_-_Root']} position={[0, -0.59, 0]} rotation={[Math.PI / 2, 0, 0]} scale={23.04} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/alcohol-transformed.glb')