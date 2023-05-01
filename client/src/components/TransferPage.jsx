import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";

const TransferPage = ({ propId, setShowTransferPage }) => {
  const { pendingOwner, isLoading3 } = useContext(TransactionContext);
  const [addressTo, setAddressTo] = useState("");


  const handleChangeAddressTo = (e) => {
    setAddressTo(e.target.value);
  };


  const handleSubmit = () => {
    if (addressTo === "") {
      alert("Please enter a value.");
      return;
    }
    pendingOwner(propId, addressTo);
    setAddressTo("");
  };

  const handleClose = () => {
    setShowTransferPage(false);
  };

  return (
    <div className="mt-5 w-full bg-transparent rounded-lg p-4 white-glassmorphism">
      <h3 className="text-xl font-semibold text-white mb-4">
        Pending Owner
      </h3>
      <input
        placeholder="Address To"
        type="address"
        value={addressTo}
        onChange={handleChangeAddressTo}
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
          Initiate
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

export default TransferPage;