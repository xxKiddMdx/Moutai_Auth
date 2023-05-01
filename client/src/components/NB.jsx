import React, { useContext }from "react";
import styled from "styled-components";
import { TransactionContext } from "../context/TransactionContext";

const Section = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled.img`
  height: 50px;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <Section>
      <Container>
        <Links>
          <Logo src="../images/logo.png" />
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Wallet</ListItem>
            <ListItem>Transaction</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Links>
        {!currentAccount && (<Button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect
              </p>
            </Button>
            )}
      </Container>
    </Section>
  );
};

export default Navbar;