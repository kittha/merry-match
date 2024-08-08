import React from "react";
import headerImage1 from "/assets/header-authen-image/header-image1.png";
import headerImage2 from "/assets/header-authen-image/header-image2.png";
import headerImage3 from "/assets/header-authen-image/header-image3.png";
import vector1 from "/assets/header-image/vector1.png";
import vector3 from "/assets/header-image/vector3.png";
import vector4 from "/assets/header-image/vector4.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#160404] text-white min-[320px]:w-auto w-[375px] lg:h-[846px] h-[1000px] overflow-hidden">
      <div className="container mx-auto flex flex-col  lg:w-[1440px] w-full lg:px-[50px] px-4">
        <div className="flex flex-col items-center justify-start w-full ">
          <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center lg:h-[758px]  z-10 relative">
            <img
              src={headerImage2}
              alt="image2"
              className="lg:translate-y-48 lg:translate-x-10 md:translate-y-4 md:translate-x-56 md:w-[275px] translate-y-10 translate-x-28 lg:order-1 order-3 w-2/3 lg:w-auto hidden md:block"
            />
            <img
              src={headerImage3}
              alt="image3"
              className="lg:translate-y-48 lg:translate-x-10 md:translate-y-4 md:translate-x-56 translate-y-10 translate-x-28 lg:order-1 order-3 w-[175px] lg:w-auto md:hidden block"
            />
            <div className="flex flex-col items-center justify-start h-auto gap-4 lg:order-2 order-2 text-center px-4 lg:px-0">
              <h3 className="text-[50px] text-white font-Nunito font-extrabold leading-snug lg:mt-20">
                Make the <br />
                first ‘Merry’
              </h3>
              <h4 className="w-[343px] text-[20px] font-semibold font-Nunito text-white leading-relaxed lg:mt-4">
                If you feel lonely, let’s start meeting{" "}
                <br className="hidden lg:block" /> new people in your area!{" "}
                <br className="block" /> Don’t forget to get Merry with us
              </h4>
              <button
                className="bg-[#C70039] shadow-lg rounded-full text-white font-Nunito h-[48px] w-[163px] font-bold lg:mt-8 mt-4 lg:hover:translate-y-[-0.25rem] lg:hover:scale-105 lg:hover:bg-pink-300 lg:duration-300"
                onClick={() => {
                  navigate("/matching");
                  //setIsOpen(false);
                }}
              >
                Start Matching!
              </button>
            </div>
            <img
              src={headerImage1}
              alt="image1"
              className="lg:-translate-y-48 lg:-translate-x-10 md:translate-y-4 md:-translate-x-64 -translate-y-8 -translate-x-28 lg:order-3 order-1 w-56 lg:w-auto"
            />
            <div className="absolute inset-0 items-center justify-center z-0 pointer-events-none hidden lg:flex">
              <img
                src={vector1}
                alt="vector1"
                className="object-contain animate-pulse"
              />
            </div>
            <div className="absolute inset-0 items-center justify-center z-0 pointer-events-none hidden lg:flex">
              <img
                src={vector3}
                alt="vector3"
                className="absolute top-[24%] left-[63%] object-contain animate-bounce"
              />
            </div>
            <div className="absolute inset-0 items-center justify-center z-0 pointer-events-none hidden lg:flex">
              <img
                src={vector4}
                alt="vector4"
                className="absolute top-[68%] right-[3.5%] object-contain animate-bounce"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
