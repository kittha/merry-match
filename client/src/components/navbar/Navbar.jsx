import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';
import logo from '../../assets/HomePage/header-merrymatch-logo.svg';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="Navbar text-[#191C77] text-[1rem] bg-[#FFFFFF] absolute z-20 overflow-auto flex items-center justify-between w-screen lg:h-[88px] h-[52px] font-bold shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.12)]">
      <div className="flex items-center justify-between w-full lg:w-[1440px] mx-auto px-4 lg:px-0">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="merry match logo"
            className="lg:ml-[170px] h-[44px]"
          />
        </button>

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
        <div className={`lg:flex lg:items-center lg:justify-between lg:mr-[160px] lg:gap-8 ${isOpen ? 'block' : 'hidden'} lg:block absolute lg:static top-[52px] left-0 w-full bg-[#FFFFFF] lg:w-auto`}>
          <Link to="why-merry" smooth={true} duration={500} className="block lg:inline-block py-2 lg:py-0 text-center lg:text-left">
            <h2 onClick={() => { navigate("/"); setIsOpen(false); }}>Why Merry Match?</h2>
          </Link>
          <Link to="howtomerry" smooth={true} duration={500} className="block lg:inline-block py-2 lg:py-0 text-center lg:text-left">
            <h2 onClick={() => { navigate("/"); setIsOpen(false); }}>How to Merry</h2>
          </Link>
          <button
            className="button-nav bg-[#c70039] shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[48px] w-[90px] font-[700] hover:bg-[#FFE1EA] hover:text-[#95002B] lg:ml-8 block lg:inline-block my-2 lg:my-0 mx-auto lg:mx-0"
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
