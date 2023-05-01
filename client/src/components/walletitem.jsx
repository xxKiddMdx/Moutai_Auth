import React, { useState } from "react";
import ChangeValuePage from "./ChangeValuePage";
import TransferPage from "./TransferPage";
import { ethers } from "ethers";

const WalletItem = ({ propId, value, onValueChangeClick, onTransferClick }) => {
  const [showTransferPage, setShowTransferPage] = useState(false);
  const [showChangeValuePage, setShowChangeValuePage] = useState(false);

  const handleTransferClick = () => {
    setShowTransferPage(true);
    setShowChangeValuePage(false);
  };
  const handleChangeValue = () => {
    setShowChangeValuePage(true);
    setShowTransferPage(false);
  };


  return (
    <div className="wallet-item">
    <div className="flex flex-col py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-semibold text-sm text-white-600">
              Property ID
            </p >
            <p className="text-sm font-semibold text-white-400">{propId}</p >
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold text-sm text-white-600">{ethers.utils.formatEther(value)} ETH</p >
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-pink-500 text-white py-1 px-2 rounded font-semibold text-xs"
              onClick={() => onTransferClick(propId)}
            >
              Transfer
            </button>
            <button
              onClick={() => onValueChangeClick(propId)}
              className="change-value-btn bg-blue-400 text-white py-1 px-2 rounded font-semibold text-xs"
            >
              Change Value
            </button>

          </div>
        </div>
      </div>

    </div>
    {showTransferPage && (
        <TransferPage setShowTransferPage={setShowTransferPage} />
      )}
      {showChangeValuePage && (
        <ChangeValuePage setShowChangeValuePage={setShowChangeValuePage} />
      )}
    </div>
  );
};

export default WalletItem;