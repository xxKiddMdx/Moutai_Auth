import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ethers } from "ethers";
import { Loader } from ".";

const ChangeValuePage = ({ propId, setShowChangeValuePage }) => {
  const { isLoading3, changeValue } = useContext(TransactionContext);
  const [inputValue, setInputValue] = useState("");
  const [displayValue, setDisplayValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      alert("Please enter a value.");
      return;
    }
    setDisplayValue(inputValue);
    setInputValue("");
    const newValue = ethers.utils.parseEther(inputValue);
    console.log(newValue);
    changeValue(propId, newValue);
  };
  
  const handleClose = () => {
    setShowChangeValuePage(false);
  };

  return (
    <div className="mt-5 w-full bg-transparent rounded-lg p-4 white-glassmorphism">
      <h3 className="text-xl font-semibold text-white mb-4">
        Change Value Amount
      </h3>
      <input
        placeholder="New Value Amount (ETH)"
        type="number"
        step="0.01"
        value={inputValue}
        onChange={handleChange}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm  blue-glassmorphism"
      />
      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {isLoading3 ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        >
          Confirm
        </button>
      )}
      <button
        className="absolute top-3 right-3 font-bold text-xl text-white-500"
        onClick={handleClose}
      >
        x
      </button>
    </div>
  );
};

export default ChangeValuePage;
