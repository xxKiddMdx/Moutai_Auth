import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({
    provider,
    signer,
    transactionsContract
  });

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: "", amount: "", propertyID: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const[ownedBottles, setOwnedBottles] = useState([]);
  // useEffect(() => {
  //   // Create dummy data
//   const dummyBottles = Array.from({ length: 100 }, (_, i) => ({
//     propId: `Property ID ${i + 1}`,
//     value: `${Math.random() * 10} ETH`,
//   }));
  
  //   setOwnedBottles(dummyBottles); 
  // }, []);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value })); 
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          propertyID: transaction.propertyID,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
        alert("Error getting transactions");
      }
    } catch (error) {
      alert("Error getting transactions");
      console.log(error);
    }
  };

  const getPropertyDetails = async (propertyId) => {
    try {
      const transactionContract = createEthereumContract();
      const result = await transactionContract.getPropertyDetails(propertyId);
      return result;
    } catch (error) {
      alert("Property not found");
      console.error('Error in getting property details:', error);
      throw error;
    }
  };

  const getAllProperties = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllProperties();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          currOwner: transaction.currOwner,
          propertyID: transaction.propId,
          amount: parseInt(transaction.value._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        // setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
        getAllProperties();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProperty = async (propId, value, owner) => {
    try {
      const transactionContract = createEthereumContract();
      const transactionHash = await transactionContract.createProperty(propId, value, owner);
      setIsLoading2(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading2(false);
      console.log(`success - ${transactionHash.hash}`);
  
      // Refresh the list of properties
      await getAllProperties();
    } catch (error) {
      console.log("Error creating property:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask first.");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      throw new Error("Error connecting wallet");
    }
  };

  
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask first.");

      const { addressTo, propertyID, amount } = formData;
      const transactionContract = createEthereumContract(); 
      const newValue = ethers.utils.parseEther(amount);


      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x76c0', // 30400 GWEI
          value: newValue._hex,
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, newValue, propertyID);

      setIsLoading(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`success - ${transactionHash.hash}`);

      //const transactionCount = await transactionContract.getTransactionCount();

      //setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      //Add different error messages: Not pending buyer, not enough tokens, etc.
      alert("Ownership transfer not initiated or invalid information.");
      console.log(error);
      throw new Error("Error sending transaction");
    }
  };

  const getUserBottles = async () => {
    if (!currentAccount) return;
    try {
        const transactionsContract = createEthereumContract();
        const ownedBottles = await transactionsContract.findAddress(currentAccount);
          console.log(ownedBottles);
        const structuredProperties = ownedBottles.map((bottle) => ({
          propId: bottle.propId.toString(),
          value: bottle.value.toString(),
        }));
        setOwnedBottles(structuredProperties);
    } catch (error) {
        console.log(error);
    }
};

  const changeValue = async (propId, newValue) => {
    try {
      const transactionContract = createEthereumContract();
      const transactionHash = await transactionContract.changeValue(propId, newValue);
      setIsLoading3(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading3(false);
      console.log(`success - ${transactionHash.hash}`);

    } catch (error) {
      console.log("Error changing property value:", error);
    }
  };
  const pendingOwner = async (propertyId, newOwner) => {
    try {
      const currentOwner = currentAccount;
      const transactionsContract = createEthereumContract();
      const transactionHash = await transactionsContract.initOwnershipTransfer(propertyId, currentOwner, newOwner);
      setIsLoading3(true);
      console.log(`loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading3(false);
      console.log(`success - ${transactionHash.hash}`);
  
      // Refresh the list of properties
      await getAllProperties();
    } catch (error) {
      console.log("Error initiating ownership transfer:", error);
    }
};
  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ getPropertyDetails, createProperty, connectWallet, currentAccount, formData, setFormData, sendTransaction, handleChange, isLoading, isLoading2, isLoading3, ownedBottles, getUserBottles, changeValue,pendingOwner }}>
      {children}
    </TransactionContext.Provider>
  );
};
 