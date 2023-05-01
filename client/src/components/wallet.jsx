import React from "react";
import { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import WalletList from "./WalletList";

const Wallet = () => {
  const {
    currentAccount,
    ownedBottles,
    getUserBottles,
  } = useContext(TransactionContext);

  useEffect(() => {
    getUserBottles();
  }, [currentAccount]);

  console.log("Owned Bottles:", ownedBottles);

  return (
    <div className="wallet-page">
      <div className="wallet-container white-glassmorphism">
        <div className="current-account">
          <h3 className="text-xl font-semibold mb-4 text-white">Current Account:</h3>
          <p className="text-white">{currentAccount}</p>
        </div>


        <WalletList ownedBottles={ownedBottles} />
      </div>
    </div>
  );
};

export default Wallet;
