import React from "react";
import exit from "../../../public/assets/profilepicture/exit.png"
import john from "../../../public/assets/profilepicture/john.png"
import crossbutton from "../../../public/assets/profilepicture/crossbutton.png"
import lovebutton from "../../../public/assets/profilepicture/lovebutton.png"
import arrowL from "../../../public/assets/profilepicture/arrowL.png"
import arrowR from "../../../public/assets/profilepicture/arrowR.png"
import location from "../../../public/assets/profilepicture/location.png"


const ProfilePopup = () => {
    return (
      <div className="w-[1064px] h-[740px]  mx-auto rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex justify-end pr-4">
          <p>
            <button><img src={exit} alt="exit"/></button>
          </p>
        </div>
        <div className="flex">
          <div className="Lside w-1/2  flex justify-center relative">
              <div className="w-[400px] h-[400px] rounded-2xl">  
              <img className="rounded-2xl " src={john} alt="" />
              <div className="flex justify-center absolute left-[180px] bottom-32">
                  <div className="flex justify-center rounded-md"><button><img src={crossbutton} alt="" /> </button></div>
                  <div className="flex justify-center rounded-md"><button><img src={lovebutton} alt="" /> </button></div>
              </div>
              <div className="flex justify-between ">
                  <div className="PhotoCount flex mt-2.5">
                      <div>1</div>
                      <div>/</div>
                      <div>2</div>
                  </div>
                  <div className="arrowBtn flex">
                      <button><img src={arrowL} alt="leftArrow" /></button>
                      <button><img src={arrowR} alt="rightArrow" /></button>
                  </div>
              </div>
              </div> 
          </div>
          
          <div className="flex justify-start font-Nunito">
            <div>
            <div className="flex font-extrabold">
            <p className="text-[46px] text-[#2A2E3F]">Jon Snow</p>
            <p className="text-[46px] text-[#646D89] ml-[16px]">26</p>
            </div>
    
            <div className="flex">
            <img classname="w-[17px] h-[22px]" src={location} alt="" />
            <div className="flex ml-[20px]  text-[#646D89]">
            <p>Bankok,Thailand</p>
            </div>
          </div>
  
          <div className=" flex flex-col font-Nunito">
              {/* col1 */}
              <div className="col1 flex mt-[50px]">  
              <p className="w-[191px] text-[16px]">Sexual identities </p>
              <p className="text-[#646D89]">Male</p>
              </div>
            
              {/* col2 */}
              <div className="col2 flex mt-[20px]"> 
              <p className="w-[191px]">Sexual preferences</p>
              <p className="text-[#646D89]">Female</p>
              </div>
              
            {/* col3 */}
              <div className="col3 flex mt-[20px]">
              <p className="w-[191px]">Racial preferences</p>
              <p className="text-[#646D89]">Asian</p>
              </div>
  
              {/* col4 */}
              <div className="col4 flex mt-[20px]">
              <p className="w-[191px]">Meeting interests</p>
              <p className="text-[#646D89]">Friends</p>
              </div>
              
          </div>
          <h1 className="mt-[50px] text-[24px] font-bold text-[#2A2E3F]">About me</h1>
          <div className="mt-[16px]">
          <p>I know nothing..but you</p>
          </div>
          <h1 className="mt-[40px] text-[24px] font-bold text-[#2A2E3F]">Hobbies and Interests</h1>
          <div className="flex mt-[24px]">
              <div className="w-[86px] h-[40px] text-[#7D2262] border border-[#DF89C6] rounded-lg mr-2 flex items-center justify-center"> <p> e-sport</p></div>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  };
export default ProfilePopup;