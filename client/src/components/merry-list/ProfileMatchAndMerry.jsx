import React from "react";
import exit from "/assets/profilepicture/exit.png";
import crossbutton from "/assets/profilepicture/crossbutton.png";
import lovebutton from "/assets/profilepicture/lovebutton.png";
import arrowL from "/assets/profilepicture/arrowL.png";
import arrowR from "/assets/profilepicture/arrowR.png";
import location from "/assets/profilepicture/location.png";
import arrowB from "/assets/profilepicture/arrowB.png";
import { useState, useContext } from "react";
import { useImage } from "../../../hooks/useImage.mjs";
import { FormContext } from "../../../contexts/FormProvider";

const ProfileMatchAndMerry = ({ user, onClose }) => {
  const { calculateAge } = useContext(FormContext);
  const { checkImage } = useImage();

  // convert Object user.avatars  to Array of avatar_url value
  const avatarsArr = Object.values(user.avatars || {});
  // console.log(avatarsArr);
  // ['https://upload.wikimedia.org/wikipedia/commons/thu…rfkern_-_Schloss_-_Ansicht_von_Westen_%281%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thu…Bread_Mountain.jpg/300px-Sweet_Bread_Mountain.jpg']

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === avatarsArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === 0 ? avatarsArr.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white lg:w-[1064px] lg:h-[740px] w-full h-full mx-auto rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex justify-end pr-4 ">
          <button onClick={onClose}>
            <img className="hidden lg:block" src={exit} alt="exit" />
          </button>
        </div>
        <div className="flex justify-start pl-0 pt-0">
          <button onClick={onClose}>
            <img
              className="block lg:hidden absolute z-30 pt-10 pl-8"
              src={arrowB}
              alt="exit"
            />
          </button>
        </div>
        <div className="lg:flex flex-row">
          <div className="lg:Lside lg:w-1/2 flex justify-center relative">
            <div className="lg:w-[400px] lg:h-[400px] w-screen h-[356px] rounded-2xl">
              {avatarsArr.length > 0 && (
                <>
                  <img
                    className="rounded-2xl bg-cover lg:w-[400px] lg:h-[400px] w-screen h-[315px]"
                    src={avatarsArr[currentAvatarIndex]}
                    alt="profile"
                  />
                  <div className="flex justify-center -translate-y-10">
                    <div className="flex justify-center rounded-md">
                      <button>
                        <img src={crossbutton} alt="cross" />
                      </button>
                    </div>
                    <div className="flex justify-center rounded-md">
                      <button>
                        <img src={lovebutton} alt="love" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between px-8 -translate-y-20">
                    <div className="PhotoCount flex mt-2.5">
                      <p>
                        {currentAvatarIndex + 1}/{avatarsArr.length}
                      </p>
                    </div>
                    <div className="arrowBtn flex">
                      <button onClick={handlePrevAvatar}>
                        <img src={arrowL} alt="leftArrow" />
                      </button>
                      <button onClick={handleNextAvatar}>
                        <img src={arrowR} alt="rightArrow" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-start font-Nunito px-8">
            <div>
              <div className="flex font-extrabold">
                <p className="text-[46px] text-[#2A2E3F]">{user.name}</p>
                <p className="text-[46px] text-[#646D89] ml-[16px]">
                  {isNaN(calculateAge(user.birthday))
                    ? "Age unknown"
                    : calculateAge(user.birthday)}
                </p>
              </div>

              <div className="flex">
                <img src={location} />
                <div className="flex ml-[20px] text-[#646D89]">
                  <p>
                    {user.city}, {user.country}
                  </p>
                </div>
              </div>

              <div className="flex flex-col font-Nunito">
                <div className="col1 flex mt-[50px]">
                  <p className="w-[191px] text-[16px]">Sexual identities</p>
                  <p className="text-[#646D89]">{user.sexualIdentity}</p>
                </div>

                <div className="col2 flex mt-[20px]">
                  <p className="w-[191px]">Sexual preferences</p>
                  <p className="text-[#646D89]">{user.sexualPreference}</p>
                </div>

                <div className="col3 flex mt-[20px]">
                  <p className="w-[191px]">Racial preferences</p>
                  <p className="text-[#646D89]">{user.racialPreference}</p>
                </div>

                <div className="col4 flex mt-[20px]">
                  <p className="w-[191px]">Meeting interests</p>
                  <p className="text-[#646D89]">{user.meetingInterests}</p>
                </div>
              </div>

              <h1 className="mt-[50px] text-[24px] font-bold text-[#2A2E3F]">
                About me
              </h1>
              <div className="mt-[16px]">
                <p>{user.bio}</p>
              </div>
              <h1 className="mt-[40px] text-[24px] font-bold text-[#2A2E3F]">
                Hobbies and Interests
              </h1>
              <div className="flex mt-[24px]">
                {user.hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="w-[86px] h-[40px] text-[#7D2262] border border-[#DF89C6] rounded-lg mr-2 flex items-center justify-center"
                  >
                    <p>{hobby}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMatchAndMerry;
