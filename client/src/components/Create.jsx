import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { Loader } from ".";
import { ethers } from 'ethers';

const Create = () => {
  const { createProperty, isLoading2 } = useContext(TransactionContext);
  const [formData, setFormData] = useState({ propId: "", value: "", owner: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { propId, value, owner } = formData;
    if (!propId || !value || !owner) return;
    const newValue = ethers.utils.parseEther(value);
    createProperty(propId, newValue, owner);
    setFormData({ propId: "", value: "", owner: "" });
  };

  return (
    <form className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
      <input
        placeholder="Property ID"
        name="propId"
        type="number"
        value={formData.propId}
        onChange={handleChange}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <input
        placeholder="Value (ETH)"
        name="value"
        type="number"
        step="0.01"
        value={formData.value}
        onChange={handleChange}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <input
        placeholder="Owner's Address"
        name="owner"
        type="text"
        value={formData.owner}
        onChange={handleChange}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <div className="h-[1px] w-full bg-gray-400 my-2" />

      {isLoading2
        ? <Loader />
        : (
        <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
        >
            Create Property
        </button>  
      )}
    </form>
  );
};

export default Create;