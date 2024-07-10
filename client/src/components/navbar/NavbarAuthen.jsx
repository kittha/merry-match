import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';


const NavbarAuthen = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="Navbar text-[#191C77] text-[1rem] bg-[#FFFFFF] fixed z-20 overflow-auto flex items-center justify-between w-full lg:h-[88px] h-[52px] font-bold shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.12)]">
      <div className="flex items-center justify-between w-full lg:w-[1440px] mx-auto px-4 lg:px-0">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="../src/assets/HomePage/header-merrymatch-logo.svg"
            alt="merry match logo"
            className="lg:ml-[170px] h-[44px]"
          />
        </button>
        <div className="flex gap-4 lg:hidden ml-24">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="../src/assets/Navbar/icon_bell.png"
              alt="merry match message"
              className="h-[26px] w-[26px]"
            />
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="../src/assets/Navbar/icon_chat.png"
              alt="merry match nofication"
              className="h-[26px] w-[26px]"
            />
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#191C77] text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-end lg:justify-between lg:gap-8 inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent lg:ml-[432px]">
          <h2 onClick={() => { navigate("/"); }}>Start Matching!</h2>
          <h2 onClick={() => { navigate("/"); }}>Merry Membership</h2>
        </div>
        <div className="hidden lg:flex lg:items-end lg:gap-4 inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent lg:mr-[160px]">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="../src/assets/Navbar/icon_bell.png"
              alt="merry match message"
              className="h-[48px] w-[48px]"
            />
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="../src/assets/Navbar/profile.png"
              alt="merry match message"
              className="h-[48px] w-[48px]"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[52px] bg-white z-10 font-Nunito text-gray-700 font-medium">
            <div className="flex justify-center items-center p-[16px] pt-[24px]">
              <button
                className="flex justify-center items-center bg-gradient-to-r from-[#742138] to-[#A878BF] button-nav shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[41px] w-[343px] font-[700]"
                onClick={() => { navigate("/"); setIsOpen(false); }}
              >
                <img src="../src/assets/Navbar/icon1.png" alt="icon1" className="mr-2"/>
                More limit Merry!
              </button>
            </div>
            <div className="flex items-center p-[12px]">
              <img src="../src/assets/Navbar/icon2.png" alt="icon2" className="mr-2 p-[10px] pl-8"/>
              <h2 onClick={() => { navigate("/"); }}>Profile</h2>
            </div>
            <div className="flex items-center p-[12px]">
              <img src="../src/assets/Navbar/icon3.png" alt="icon3" className="mr-2 p-[10px] pl-8"/>
              <h2 onClick={() => { navigate("/"); }}>Merry list</h2>
            </div>
            <div className="flex items-center p-[12px]">
              <img src="../src/assets/Navbar/icon4.png" alt="icon4" className="mr-2 p-[10px] pl-8"/>
              <h2 onClick={() => { navigate("/"); }}>Merry Membership</h2>
            </div>
            <div className="flex items-center p-[12px]">
              <img src="../src/assets/Navbar/icon5.png" alt="icon5" className="mr-2 p-[10px] pl-8"/>
              <h2 onClick={() => { navigate("/"); }}>Compliant</h2>
            </div>
            <div className="mx-auto border-t border-gray-300 w-[343px] my-4"></div>
            <div className="flex items-center p-[12px] pt-0">
              <img src="../src/assets/Navbar/icon6.png" alt="icon6" className="mr-2 p-[10px] pl-8"/>
              <h2 onClick={() => { navigate("/"); }}>Log out</h2>
            </div>

        </div>
      )}
    </nav>
  );
};

export default NavbarAuthen;
