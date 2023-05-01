import React from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Alcohol from "./Alcohol.jsx";
import styled from "styled-components";

const CP = () => {

    const Container = styled.div`
    width: 400px;
    height: 400px;
    `;

return (
    <>
      <Container>
        <Canvas>
          <Stage environment="city" intensity={0.5}>
            <Alcohol />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Container>
    </>
  );
};

export default CP;