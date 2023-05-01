import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";

const SellPage = ({ setShowSellPage }) => {
    const { pendingOwner, isLoading3 } = useContext(TransactionContext);
    const [formData, setFormData] = useState({ propId: "", addressTo: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      const handleSubmit = (e) => {
        e.preventDefault();

        const { propId, addressTo } = formData;
        if (!propId || !addressTo) return;
        pendingOwner(propId, addressTo);
        setFormData({ propId: "", addressTo: "" });
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
            placeholder="Address To"
            name="addressTo"
            type="address"
            value={formData.addressTo}
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
              Initiate
            </button>
          )}
    </form>
    );
};
    
export default SellPage;