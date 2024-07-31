import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Portal from "./Portal";
import { useAuth } from "../../contexts/authentication";
import { FormContext } from "../../contexts/FormProvider";
import profile from "/assets/navbar-image/profile.png";
import icon1 from "/assets/navbar-image/icon1.png";
import icon2 from "/assets/navbar-image/icon2.png";
import icon3 from "/assets/navbar-image/icon3.png";
import icon4 from "/assets/navbar-image/icon4.png";
import icon5 from "/assets/navbar-image/icon5.png";
import icon6 from "/assets/navbar-image/icon6.png";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const bellIconRef = useRef(null);
  const profileIconRef = useRef(null);
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
    <div className="relative">
        <button ref={profileIconRef} onClick={handleProfileClick}>
        <img
            src={profile}
            alt="merry-match-profile"
            className="h-[48px] w-[48px]"
        />
        </button>
        {profileMenuOpen && (
        <Portal>
            <div
            id="portal-root"
            style={{
                position: "fixed",
                top: `${profileMenuPosition.top}px`,
                left: `${profileMenuPosition.left}px`,
                transform: "translateX(-50%)",
                marginTop: "32px",
            }}
            className="w-[198px] h-[258px] font-[500] bg-white shadow-lg rounded-[16px] py-2 z-30 font-Nunito text-sm"
            >
            <div className="flex justify-center items-center pb-2 pt-0.5 ">
                <button
                className="flex justify-center items-center bg-gradient-to-r from-[#742138] to-[#A878BF] button-nav shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[41px] w-[179px] "
                onClick={() => {
                    navigate("/package");
                    setIsOpen(false);
                }}
                >
                <img src={icon1} alt="icon1" className="mr-2 " />
                More limit Merry!
                </button>
            </div>
            <div className="flex items-center h-[37px] p-[8px]">
                <img src={icon2} alt="icon2" className="mr-2  pl-4" />
                <button
                onClick={() => navigate(`/user-profile/${state.user.id}`)}
                >
                Profile
                </button>
            </div>
            <div className="flex items-center h-[37px] p-[8px]">
                <img src={icon3} alt="icon3" className="mr-2 pl-4" />
                <button onClick={() => navigate("/merry-list")}>
                Merry list
                </button>
            </div>
            <div className="flex items-center h-[37px] p-[8px]">
                <img src={icon4} alt="icon4" className="mr-2 pl-4" />
                <button onClick={() => navigate(`/membership/${userId}`)}>
                Merry Membership
                </button>
            </div>
            <div className="flex items-center h-[37px] p-[8px] mb-1">
                <img src={icon5} alt="icon5" className="mr-2 pl-4" />
                <button onClick={() => navigate("/complaint")}>
                Compliant
                </button>
            </div>
            <div className="mx-auto border-t border-gray-300 w-full p-[2px]"></div>
            <div className="flex items-center h-[37px] p-[8px]">
                <img src={icon6} alt="icon6" className="mr-2 pl-4" />
                <button onClick={handleLogout}>Log out</button>
            </div>
            </div>
        </Portal>
        )}
    </div>
  );
};

export default ProfileMenu;
