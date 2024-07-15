import React from "react";
import exit from "../../../public/assets/profilepicture/exit.png"
import john from "../../../public/assets/profilepicture/john.png"
import crossbutton from "../../../public/assets/profilepicture/crossbutton.png"
import lovebutton from "../../../public/assets/profilepicture/lovebutton.png"
import arrowL from "../../../public/assets/profilepicture/arrowL.png"
import arrowR from "../../../public/assets/profilepicture/arrowR.png"
import location from "../../../public/assets/profilepicture/location.png"


const ProfilePopup = () => {
    return(
        <div className="w-[1140px] h-[740px] mx-auto rounded-lg p-3 shadow-2xl">
            <div className="flex justify-end">
                <p>
                    <button><img src={exit} alt="exit"/></button>
                </p>
            </div>
            <div className="flex">
                <div className="Lside w-1/2  flex justify-center relative">
                    <div className="w-[400px] h-[400px] rounded-2xl">
                        <img className=" rounded-[30px]" src={john} alt="yourPicProfile" />
                        <div className="flex justify-center absolute left-48 -bottom-10"> 
                        <div className="flex justify-center rounded-md"><button><img src={crossbutton} alt="" /> </button></div>
                        <div className="flex justify-center rounded-md"><button><img src={lovebutton} alt="" /> </button></div>
                        </div>
                        <div className="flex justify-between mt-[12px]">
                            <div className="PhotoCount flex">
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
                <div className="Rside w-1/2 flex-row justify-start">
                    <div className="w-[418px] flex">
                        <p className="text-[46px]">John Snow</p>
                        <p className="text-[46px] text-[#646D89] ml-[16px]">26</p>
                    </div>
                    <img classname="w-[17px] h-[22px]" src={location} alt="" />
                    <div className="flex ml-[20px] text-[#646D89]">
                    Bankok, Thailand
                    </div>
                </div>
            </div> 
        </div>
    )
}
export default ProfilePopup;