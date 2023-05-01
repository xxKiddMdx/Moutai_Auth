import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    
    <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );



const Purchase = () => {
  const { formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
    
  const handleSubmit = (e) => {
    
    const { addressTo, propertyID, amount } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !propertyID) return;
    sendTransaction();
    
  };

  return (
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="wine-section">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center white-glassmorphism">
          <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
          <Input placeholder="Property ID" name="propertyID" type="number" handleChange={handleChange} />
          <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
          

          <div className="h-[1px] w-full bg-gray-400 my-2" />
        
          {isLoading
            ? <Loader />
            : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Purchase;
