import React from "react";
import headerimage1 from '../../assets/HomePage/header-image 1.png'
import headerimage2 from '../../assets/HomePage/header-image 2.png'
import vector1 from '../../assets/HomePage/vector1.png'
import vector3 from '../../assets/HomePage/vector3.png'
import vector4 from '../../assets/HomePage/vector4.png'

const Header = () => {
  return (
    <div className="relative bg-[#160404] text-white w-screen h-[846px]">
      <div className="container mx-auto flex flex-col items-center justify-center h-screen w-[1440px] px-[150px]">
        <div className="flex flex-col items-center justify-start w-full h-full">
          <div className="flex w-full justify-between items-center h-[758px] z-10 relative">
            <img src={headerimage2} alt="Image 1" className="translate-y-48" />
            <div className="flex flex-col items-center justify-start h-auto gap-4">
              <h3 className="text-[60px] text-white text-center font-extrabold leading-snug mt-20 text-4xl ">
                Make the <br />
                first ‘Merry’
              </h3>
              <h4 className="text-[20px] font-semibold text-white text-center leading-relaxed mt-4">
                If you feel lonely, let’s start meeting <br /> new people in your area! <br /> Don’t forget to get Merry with us
              </h4>
              <button className="bg-[#C70039] shadow-lg rounded-full text-white h-[48px] w-[163px] font-bold mt-8 hover:translate-y-[-0.25rem] hover:scale-105 hover:bg-pink-300 duration-300">
                Start Matching!
              </button>
            </div>
            <img src={headerimage1} alt="Image 2" className="-translate-y-48"/>
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <img src={vector1} alt="vector 1" className="object-contain animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <img src={vector3} alt="vector 3" className="absolute top-[24%] left-[63%] object-contain animate-bounce" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <img src={vector4} alt="vector 4" className="absolute top-[68%] right-[3.5%] object-contain animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;