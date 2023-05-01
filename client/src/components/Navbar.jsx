import React from "react";
import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

//import WalletModal from "./WalletModal.jsx";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops, onClick }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`} onClick={onClick}>
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [showWallet, setShowWallet] = React.useState(false);
  const avatarSrc = "../../images/avatar.png";
  const bottleCount = 10;

  return (
    <>
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          < img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-right flex-initial">
          {["Market", "Tutorials"].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}
          <NavBarItem
            key="Wallet"
            title="Wallet"
            onClick={() => setShowWallet(!showWallet)}
          />
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Login
          </li>
        </ul>
        <div className="flex relative">
          {!toggleMenu && (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {["Market", "Tutorials"].map((item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              ))}
              <li
                className="my-2 text-lg cursor-pointer"
                onClick={() => {
                  setShowWallet(!showWallet);
                  setToggleMenu(false);
                }}
              >
                Wallet
              </li>
            </ul>
          )}
        </div>
      </nav>
      {showWallet && (
        <WalletModal
          avatarSrc={avatarSrc}
          bottleCount={bottleCount}
          onClose={() => setShowWallet(false)}
        />
      )}
    </>
  );
};

export default Navbar;