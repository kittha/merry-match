import React from 'react';
import vector2 from '../../assets/HomePage/vector2.png';

function FirstSection() {
  return (
    <div>
      <div className="w-full bg-[#160404] lg:h-[533px] h-auto lg:flex justify-center items-center space-x-9 relative">
        <div className="lg:w-[549px] lg:h-[325px] lg:flex lg:flex-col justify-center px-0 lg:px-160">
          <h1 className="text-[#DF89C6] text-[46px] font-Nunito font-[800] lg:pl-80 px-4 2xl:pl-0" id="why-merry">
            Why Merry Match?
          </h1>
          <br />
          <p className="text-white font-Nunito text-[20px] lg:pl-80 px-4 2xl:pl-0">
            Merry Match is a new generation of online dating website for everyone
          </p>
          <br />
          <p className="text-white font-Nunito text-[16px] lg:pl-80 px-4 2xl:pl-0">
            Whether you’re committed to dating, meeting new people, expanding your social network, meeting locals while traveling, or even just making a small chat with strangers.
          </p>
          <br />
          <p className="text-white font-Nunito text-[16px] lg:pl-80 px-4 2xl:pl-0">
            This site allows you to make your own dating profile, discover new people, save favorite profiles, and let them know that you’re interested.
          </p>
        </div>

        <div className="lg:w-[549px] lg:h-[325px] w-[280px] lg:mt-0 mt-10 lg:pb-0 pb-28">
          <img src={vector2} alt="Vector 2" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default FirstSection;
