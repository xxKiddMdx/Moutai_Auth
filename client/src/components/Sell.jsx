import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useContext, useRef } from "react";
import Store from "./Store.jsx";
import styled from "styled-components";

const Sell = () => {
  const cameraRef = useRef();

  const Container = styled.div`
    width: 400px;
    height: 400px;
`
  
  return (
    <Container>
    <Canvas camera={{ position: [0, 0, 10], rotation: [Math.PI/2, 0, 0] }} >
      <Stage environment="city" intensity={0.5}>
        <Store />
      </Stage>
      <OrbitControls enableZoom={false} />
    </Canvas>
    </Container>
  );
};

export default Sell;
