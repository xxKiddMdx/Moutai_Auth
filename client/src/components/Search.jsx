import React from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Magnifier from "./Magnifier.jsx";
import styled from "styled-components";

const Search = () => {

const Container = styled.div`
    width: 300px;
    height: 300px;
`;

  return (
    <>
      <Container>
        <Canvas>
          <Stage environment="city" intensity={0.5}>
            <Magnifier />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </Container>
    </>
  );
};

export default Search;
