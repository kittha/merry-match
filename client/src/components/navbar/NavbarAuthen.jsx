import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Portal from "./Portal";
import { useAuth } from "../../contexts/authentication";
import { FormContext } from "../../contexts/FormProvider";
import headerMerryMatchLogo from "/assets/header-image/header-merrymatch-logo.svg";
import iconBell from "/assets/navbar-image/icon_bell.png";
import iconChat from "/assets/navbar-image/icon_chat.png";
import profileMenu1 from "/assets/navbar-image/profile_menu1.png";
import ChatContainer from "../matchingpage/chatcontainer/ChatContainer";
import HamburgerMobileMenu from "./HamburgerMobileMenu";
import ProfileMenu from "./ProfileMenu";

const NavbarAuthen = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const bellIconRef = useRef(null);
  const profileIconRef = useRef(null);
  const [bellMenuPosition, setBellMenuPosition] = useState({ top: 0, left: 0 });
  const [showChat, setShowChat] = useState(false);
  const [profileMenuPosition, setProfileMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const { resetForm } = useContext(FormContext);

  const handleBellClick = () => {
    setBellMenuOpen(!bellMenuOpen);
    setProfileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
    setBellMenuOpen(false);
  };

  const { logout, state } = useAuth();

  const handleLogout = () => {
    resetForm();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (bellIconRef.current) {
      const bellRect = bellIconRef.current.getBoundingClientRect();
      setBellMenuPosition({ top: bellRect.bottom, left: bellRect.left });
    }
  }, [bellMenuOpen]);

  useEffect(() => {
    if (profileIconRef.current) {
      const profileRect = profileIconRef.current.getBoundingClientRect();
      setProfileMenuPosition({
        top: profileRect.bottom,
        left: profileRect.left,
      });
    }
  }, [profileMenuOpen]);
  // console.log("navbar", state);
  return (
    <nav className="Navbar text-[#64001D] text-[1rem] font-Nunito bg-[#FFFFFF] fixed z-50 overflow-auto flex items-center justify-between w-full lg:h-[88px] h-[52px] font-bold shadow-md">
      <div className="flex items-center justify-between w-full lg:w-[1440px] mx-auto px-4 lg:px-0">
        <button onClick={() => navigate("/")}>
          <img
            src={headerMerryMatchLogo}
            alt="merry-match-logo"
            className="lg:ml-[170px] h-[44px]"
          />
        </button>
        <div className="flex gap-4 lg:hidden ml-24">
          <button onClick={handleBellClick}>
            <img
              src={iconBell}
              alt="merry-match-message"
              className="h-[26px] w-[26px]"
            />
          </button>
          <button onClick={() => setShowChat(!showChat)}>
            <img
              src={iconChat}
              alt="merry match notification"
              className="h-[26px] w-[26px]"
            />
          </button>
          {/*---------------------------------------- Hamburger button---------------------------------------------*/}
          <div className="lg:hidden pt-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#191C77] text-2xl"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        {/*-------------------------------------------- For Desktop Menu -----------------------------------------------*/}
        <div className="hidden lg:flex lg:items-end lg:justify-between lg:gap-8 inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent lg:ml-[432px]">
          <button onClick={() => navigate("/matching")}>Start Matching!</button>
          <button onClick={() => navigate("/membership")}>Merry Membership</button>
        </div>

        {/* ------------------------------------------notification ---------------------------------------------------- */}

        <div className="hidden lg:flex lg:items-end lg:gap-4 inset-0 top-[52px] lg:top-auto lg:static bg-white lg:bg-transparent lg:mr-[160px]">
          <div className="relative">
            <button ref={bellIconRef} onClick={handleBellClick}>
              <img
                src={iconBell}
                alt="merry-match-bell"
                className="h-[48px] w-[48px]"
              />
            </button>
            {bellMenuOpen && (
              <Portal>
                <div
                  style={{
                    position: "fixed",
                    top: window.innerWidth <= 640 ? "0" : `${bellMenuPosition.top}px`,
                    left: window.innerWidth <= 640 ? "0" : `${bellMenuPosition.left}px`,
                    transform: window.innerWidth <= 640 ? "none" : "translateX(-50%)",
                    marginTop: window.innerWidth <= 640 ? "0" : "32px",
                    width: window.innerWidth <= 640 ? "100%" : "250px",
                    height: window.innerWidth <= 640 ? "100%" : "215px",
                    fontWeight: 500,
                    backgroundColor: "white",
                    boxShadow: window.innerWidth <= 640 ? "none" : "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: window.innerWidth <= 640 ? "0" : "16px",
                    padding: "55px 10px",
                    zIndex: 30,
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  <div className="flex items-center h-[66px] p-[8px]">
                    <img
                      src={profileMenu1}
                      alt="icon2"
                      className="ml-1 mr-3 h-[32px] w-[32px]"
                    />
                    <button onClick={() => navigate("/")} className="text-start">
                      ‘Khal Drogo’ Just Merry you! Click here to see profile
                    </button>
                  </div>
                </div>
              </Portal>
            )}
            {showChat && (
              <Portal>
                <div className="fixed inset-0 z-40">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 top-[52px] lg:top-[88px] bg-white z-40">
                      <ChatContainer />
                    </div>
                  </div>
                </div>
              </Portal>
            )}
          </div>

          {/* ----------------------------------------- profile menu ---------------------------------------------------- */}
          
          <ProfileMenu />
        </div>
      </div>

      {/*----------------------------------------------- Mobile Menu ---------------------------------------------------- */}
      {isOpen && (
        <HamburgerMobileMenu />
      )}
    </nav>
  );
};

export default NavbarAuthen;
