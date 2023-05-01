import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Transfer from "./Transfer";
import Search from "./Search";
import Sell from "./Sell";
import SellPage from "./SellPage";
import CP from "./CP";
import PropertyDetails from "./PropertyDetails";
import Purchase from "./Purchase";
import Create from "./Create";
import { TransactionContext } from "../context/TransactionContext";

const data = [
  "Search",
  "Purchase",
  "Sell",
  "Create",
];



const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
  font-weight: 300;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 90px;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

  ::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  
`;


const Works = () => {
  const [work, setWork] = useState("Search");
  const { currentAccount } = useContext(TransactionContext);
  const accountAddress = currentAccount;
  const adminAddress = "0xa7b59b28a77ccdf354690c518577bacff680f8fd";
  const isAdmin = accountAddress.toLowerCase() === adminAddress.toLowerCase();
  
  return (
    <Section>
      <Container>
        <Left>
          <List>
          {data.map((item) => (
              // Add a conditional rendering check here
              (item !== "Create" || isAdmin) && (
                <ListItem key={item} text={item} onClick={() => setWork(item)}>
                  {item}
                </ListItem>
              )
            ))}
          </List>
        </Left>
        <Right>
          {work === "Search" ? (

            <SectionContainer>
              <Search />
              <PropertyDetails />
            </SectionContainer>
          ) : work === "Purchase" ? (
            <SectionContainer>
            <Transfer />
            <Purchase />
            </SectionContainer>
          ) : work === "Sell" ? (
            <SectionContainer>
            <Sell />
            <SellPage />
            </SectionContainer>
          ) : (
            <SectionContainer>
              <CP />
              <Create />
            </SectionContainer>
          )}
        </Right>
      </Container>
    </Section>
  );
};



export default Works;