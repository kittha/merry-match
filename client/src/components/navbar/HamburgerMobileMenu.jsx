import icon1 from "/assets/navbar-image/icon1.png";
import icon2 from "/assets/navbar-image/icon2.png";
import icon3 from "/assets/navbar-image/icon3.png";
import icon4 from "/assets/navbar-image/icon4.png";
import icon5 from "/assets/navbar-image/icon5.png";
import icon6 from "/assets/navbar-image/icon6.png";
import { useAuth } from "../../contexts/authentication";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../contexts/FormProvider";
import { useContext } from "react";


const HamburgerMobileMenu = () => {
    const { resetForm } = useContext(FormContext);
    const navigate = useNavigate();
    

    const { logout, state } = useAuth();
    const handleLogout = () => {
        resetForm();
        logout();
        navigate("/login");
    };

  return (
        <div className="lg:hidden fixed inset-0 top-[52px] bg-white z-10 font-Nunito text-gray-700 font-medium">
          <div className="flex justify-center items-center p-[16px] pt-[24px]">
            <button
              className="flex justify-center items-center bg-gradient-to-r from-[#742138] to-[#A878BF] button-nav shadow-[2px 2px 12px 0 rgba(64, 50, 133, 0.16)] rounded-[99px] text-[#ffffff] h-[41px] w-[343px] font-[700]"
              onClick={() => {
                navigate("/package");
                setIsOpen(false);
              }}
            >
              <img src={icon1} alt="icon1" className="mr-2" />
              More limit Merry!
            </button>
          </div>
          <div className="flex items-center p-[12px]">
            <img src={icon2} alt="icon2" className="mr-2 p-[10px] pl-8" />
            <button onClick={() => navigate(`/user-profile/${state.user.id}`)}>
              Profile
            </button>
          </div>
          <div className="flex items-center p-[12px]">
            <img src={icon3} alt="icon3" className="mr-2 p-[10px] pl-8" />
            <button onClick={() => navigate("/merry-list")}>Merry list</button>
          </div>
          <div className="flex items-center p-[12px]">
            <img src={icon4} alt="icon4" className="mr-2 p-[10px] pl-8" />
            <button onClick={() => navigate(`/membership/${userId}`)}>
              Merry Membership
            </button>
          </div>
          <div className="flex items-center p-[12px]">
            <img src={icon5} alt="icon5" className="mr-2 p-[10px] pl-8" />
            <button onClick={() => navigate("/complaint")}>Compliant</button>
          </div>
          <div className="mx-auto border-t border-gray-300 w-[343px] my-4"></div>
          <div className="flex items-center p-[12px] pt-0">
            <img src={icon6} alt="icon6" className="mr-2 p-[10px] pl-8" />
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
  );
};

export default HamburgerMobileMenu;
