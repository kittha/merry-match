import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import headerMerryMatchLogo from "../../assets-backup/header-image/header-merrymatch-logo.svg";
import iconBell from "../../assets-backup/navbar-image/icon_bell.png";
import iconChat from "../../assets-backup/navbar-image/icon_chat.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <nav className="Navbar text-[#411032] text-[1rem] font-Nunito bg-[#FFFFFF] fixed z-20 overflow-auto flex items-center justify-between w-screen lg:h-[88px] h-[52px] font-bold shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.12)]">
      <div className="flex items-center justify-between w-full lg:w-[1440px] mx-auto px-4 lg:px-0">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={headerMerryMatchLogo}
            alt="merry-match-logo"
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
              src={iconBell}
              alt="merry match message"
              className="h-[26px] w-[26px]"
            />
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            {isVisible && (
              <img
                src={iconChat}
                alt="merry-match-nofication"
                className="h-[26px] w-[26px]"
              />
            )}
          </button>
        </div>

        {/*------------------------------------------------ Hamburger Menu for Mobile ------------------------------------------------------*/}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#191C77] text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/*---------------------------------------- Desktop Menu -------------------------------------------------------------------*/}

        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-8 inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent mr-[160px]">
          <ScrollLink
            to="first-section"
            smooth={true}
            duration={500}
            className="block lg:inline-block py-2 lg:py-0 ml-8 lg:text-left"
          >
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Why Merry Match?
            </button>
          </ScrollLink>
          <ScrollLink
            to="second-section"
            smooth={true}
            duration={500}
            className="block lg:inline-block py-2 lg:py-0 ml-8 lg:text-left"
          >
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              How to Merry
            </button>
          </ScrollLink>
          <button
            className="button-nav bg-[#c70039] shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] lg:h-[48px] h-[41px] lg:w-[90px] w-[343px] font-[700] hover:bg-[#FFE1EA] hover:text-[#95002B] lg:ml-8 block lg:inline-block my-2 lg:my-0 mx-auto lg:mx-0"
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
          >
            Login
          </button>
        </div>

        {/*-------------------------------------------- Mobile Menu -----------------------------------------------------------------------*/}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[52px] bg-white z-10 font-Nunito text-gray-700 font-medium">
            <div className="flex justify-center items-center p-[16px] pt-[24px]">
              <button
                className="flex justify-center items-center bg-[#C70039] button-nav shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[41px] w-[343px] font-[700]"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
