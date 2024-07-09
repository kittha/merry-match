import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';
import logo from '../../assets/HomePage/header-merrymatch-logo.svg';
import icon1 from '../../assets/Navbar/icon_bell.png';
import icon2 from '../../assets/Navbar/icon_chat.png';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="Navbar text-[#191C77] text-[1rem] bg-[#FFFFFF] fixed z-20 overflow-auto flex items-center justify-between w-screen lg:h-[88px] h-[52px] font-bold shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.12)]">
      <div className="flex items-center justify-between w-full lg:w-[1440px] mx-auto px-4 lg:px-0">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="merry match logo"
            className="lg:ml-[170px] h-[44px] mr-24"
          />
        </button>
        <div className="flex gap-4 lg:hidden">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={icon1}
              alt="merry match logo"
              className="h-[26px] w-[26px]"
            />
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={icon2}
              alt="merry match logo"
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

        {/* Menu Items */}
        <div className={`lg:flex lg:items-center lg:justify-between lg:mr-[160px] lg:gap-8 ${isOpen ? 'fixed' : 'hidden'} lg:block inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent`}>
          <Link to="why-merry" smooth={true} duration={500} className="block lg:inline-block py-2 lg:py-0 ml-8 lg:text-left">
            <h2 onClick={() => { navigate("/"); setIsOpen(false); }}>Why Merry Match?</h2>
          </Link>
          <Link to="howtomerry" smooth={true} duration={500} className="block lg:inline-block py-2 lg:py-0 ml-8 lg:text-left">
            <h2 onClick={() => { navigate("/"); setIsOpen(false); }}>How to Merry</h2>
          </Link>
          <button
            className="button-nav bg-[#c70039] shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] lg:h-[48px] h-[41px] lg:w-[90px] w-[343px] font-[700] hover:bg-[#FFE1EA] hover:text-[#95002B] lg:ml-8 block lg:inline-block my-2 lg:my-0 mx-auto lg:mx-0"
            onClick={() => { navigate("/login"); setIsOpen(false); }}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
