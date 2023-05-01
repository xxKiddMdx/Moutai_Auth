import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useContext, useRef } from "react";
import Eth from "./Eth.jsx";
import styled from "styled-components";


const Transfer = () => {

    const Container = styled.div`
    width: 400px;
    height: 400px;
`

    return (
        <Container>
        <Canvas>
            <Stage environment="city" intensity={0.5}>
            <Eth />
            </Stage>
            <OrbitControls enableZoom={false} />
        </Canvas>
        </Container>
    );
};

export default Transfer;