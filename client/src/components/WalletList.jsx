import WalletItem from "./walletitem";
import "./wallet.css";
import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import ChangeValuePage from "./ChangeValuePage";
import { ethers } from "ethers";
import TransferPage from "./TransferPage";

const WalletList = () => {
  const { ownedBottles, getUserBottles } = useContext(TransactionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBalance, setTotalBalance] = useState(0);
  const itemsPerPage = 10;
  const [selectedPropId, setSelectedPropId] = useState(null);
  const [showChangeValuePage, setShowChangeValuePage] = useState(false);
  const [showTransferPage, setShowTransferPage] = useState(false);
  const [activePage, setActivePage] = useState(null);

  const handleValueChangeClick = (propId) => {
    setSelectedPropId(propId);
    setActivePage("changeValue");
  };

  const handleTransferClick = (propId) => {
    setSelectedPropId(propId);
    setActivePage("transfer");
  };

  useEffect(() => {
    getUserBottles();
  }, []);

  useEffect(() => {
    const balance = ownedBottles.reduce((acc, bottle) => acc + parseFloat(ethers.utils.formatEther(bottle.value)), 0);
    setTotalBalance(balance);
  }, [ownedBottles]);

  const totalPages = Math.ceil(ownedBottles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ownedBottles.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full px-5 wallet-list-container">
      <div className="flex justify-between items-center mt-10">
        <div className="flex items-center space-x-1 text-white-600">
          <p>ETH</p >
          <i className="ri-arrow-drop-down-line"></i>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold text-base text-white-600 mb-1">
            {totalBalance.toFixed(8)}
          </p >
          <p className="text-sm font-semibold text-white-400 mt-1">
          Total Inventory Value
          </p >
        </div>
      </div>
      <hr className="border-t border-white-200 my-7" />
      <div className="wallet-items">
                {currentItems.map((item, i) => (
          <div key={i}>
            <WalletItem
              {...item}
              onValueChangeClick={handleValueChangeClick}
              onTransferClick={handleTransferClick}
            />
          </div>
        ))}
      </div>
      <div>
      {selectedPropId && activePage === "changeValue" && (
        <ChangeValuePage
          propId={selectedPropId}
          setShowChangeValuePage={() => {
            setSelectedPropId(null);
            setActivePage(null);
          }}
        />
      )}
      {selectedPropId && activePage === "transfer" && (
        <TransferPage
          propId={selectedPropId}
          setShowTransferPage={() => {
            setSelectedPropId(null);
            setActivePage(null);
          }}
        />
      )}
      </div>
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i + 1)}
            className={`page-btn ${
              currentPage === i + 1 ? "page-btn-active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletList;


