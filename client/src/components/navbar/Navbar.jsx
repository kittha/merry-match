import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';
import logo from '../../assets/HomePage/header-merrymatch-logo.svg';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="Navbar text-[#191C77] text-[1rem] bg-[#FFFFFF] absolute z-20 overflow-auto flex items-center justify-between w-screen h-[88px] font-bold shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.12)]">
      <div className="flex items-center justify-between w-[1440px] mx-auto">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={logo}
          alt="merry match logo"
          className="ml-[170px] h-[44px]"
        />
      </button>

      <div className="mr-[160px] flex flex-row items-center justify-between gap-8">
        <Link to="why-merry" smooth={true} duration={500}>
          <h2 onClick={() => navigate("/")}>Why Merry Match?</h2>
        </Link>
        <Link to="howtomerry" smooth={true} duration={500}>
          <h2 onClick={() => navigate("/")}>How to Merry</h2>
        </Link>
        <button
          className="button-nav bg-[#c70039] shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[48px] w-[90px] font-[700] hover:bg-[#FFE1EA] hover:text-[#95002B]"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
