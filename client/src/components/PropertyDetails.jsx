import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ethers } from "ethers";

const PropertyDetails = () => {
  const { getPropertyDetails } = useContext(TransactionContext);
  const [searchID, setSearchID] = useState("");
  const [propertyDetails, setPropertyDetails] = useState(null);

  const handleSearch = async () => {
    if (searchID) {
      const details = await getPropertyDetails(searchID);
      console.log(details);
      setPropertyDetails(details);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full p-5 mt-10 white-glassmorphism">
      <input
        placeholder="Search Bottle ID"
        type="number"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
      >
        Search
      </button>
      {propertyDetails && (
        <div className="mt-5 w-full bg-transparent rounded-lg p-4 white-glassmorphism">
          <h3 className="text-xl font-semibold text-white mb-4">
            Bottle Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-white">
              <span className="font-semibold">Bottle ID: </span>
              {propertyDetails.propId.toString()}
            </div>
            <div className="text-white">
              <span className="font-semibold">Value: </span>
              {ethers.utils.formatEther(propertyDetails.value).toString()} ETH
            </div>
            <div className="text-white col-span-2">
              <span className="font-semibold">Current Owner: </span>
              <span className="small-text">{propertyDetails.currOwner}</span>
            </div>
            <div className="text-white col-span-2">
              <span className="font-semibold">Pending Owner: </span>
              <span className="small-text">{propertyDetails.pendingOwner}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
