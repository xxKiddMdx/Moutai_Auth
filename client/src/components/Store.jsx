import React, { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/store-transformed.glb')
  const modelRef = useRef()
  
  const [rotation, setRotation] = useState([1.88, -1.52, -1.53])
  useEffect(() => {
    setRotation([1.88, -1.52, -1.53])
  }, [])

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <group scale={0.01 * 1.5}>
        <mesh geometry={nodes.Coin_Gold_0.geometry} material={materials.Gold} rotation={rotation} scale={15.41} />
      </group>
    </group>
  )
}

useGLTF.preload('/store-transformed.glb')
