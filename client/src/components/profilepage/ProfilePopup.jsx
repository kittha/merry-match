import React from "react";
import exit from "../../../public/assets/profilepicture/exit.png";
import crossbutton from "../../../public/assets/profilepicture/crossbutton.png";
import lovebutton from "../../../public/assets/profilepicture/lovebutton.png";
import arrowL from "../../../public/assets/profilepicture/arrowL.png";
import arrowR from "../../../public/assets/profilepicture/arrowR.png";
import location from "../../../public/assets/profilepicture/location.png";
import arrowB from "../../../public/assets/profilepicture/arrowB.png";
import { useState } from "react";

const ProfilePopup = ({ profileData, onClose }) => {
  console.log(profileData);
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === profileData.avatars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === 0 ? profileData.avatars.length - 1 : prevIndex - 1
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
            <div className="lg:w-[400px] lg:h-[400px] rounded-2xl">
              {profileData.avatars.length > 0 && (
                <>
                  <img
                    className="rounded-2xl hidden lg:block"
                    src={profileData.avatars[currentAvatarIndex].url}
                    alt="profile"
                  />
                  <img
                    className="rounded-2xl block lg:hidden"
                    src={profileData.avatars[currentAvatarIndex].url}
                    alt="profile"
                  />
                  <div className="flex justify-center absolute left-[180px] lg:bottom-32 bottom-5">
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
                  <div className="flex justify-between px-8 pt-4">
                    <div className="PhotoCount flex mt-2.5">
                      <p>
                        {currentAvatarIndex + 1}/{profileData.avatars.length}
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
                <p className="text-[46px] text-[#2A2E3F]">{profileData.name}</p>
                <p className="text-[46px] text-[#646D89] ml-[16px]">
                  {isNaN(calculateAge(profileData.birthday))
                    ? "Age unknown"
                    : calculateAge(profileData.birthday)}
                </p>
              </div>

              <div className="flex">
                <img src={location} />
                <div className="flex ml-[20px] text-[#646D89]">
                  <p>
                    {profileData.city}, {profileData.country}
                  </p>
                </div>
              </div>

              <div className="flex flex-col font-Nunito">
                <div className="col1 flex mt-[50px]">
                  <p className="w-[191px] text-[16px]">Sexual identities</p>
                  <p className="text-[#646D89]">{profileData.sexualIdentity}</p>
                </div>

                <div className="col2 flex mt-[20px]">
                  <p className="w-[191px]">Sexual preferences</p>
                  <p className="text-[#646D89]">
                    {profileData.sexualPreference}
                  </p>
                </div>

                <div className="col3 flex mt-[20px]">
                  <p className="w-[191px]">Racial preferences</p>
                  <p className="text-[#646D89]">
                    {profileData.racialPreference}
                  </p>
                </div>

                <div className="col4 flex mt-[20px]">
                  <p className="w-[191px]">Meeting interests</p>
                  <p className="text-[#646D89]">
                    {profileData.meetingInterest}
                  </p>
                </div>
              </div>

              <h1 className="mt-[50px] text-[24px] font-bold text-[#2A2E3F]">
                About me
              </h1>
              <div className="mt-[16px]">
                <p>{profileData.bio}</p>
              </div>
              <h1 className="mt-[40px] text-[24px] font-bold text-[#2A2E3F]">
                Hobbies and Interests
              </h1>
              <div className="flex mt-[24px]">
                {profileData.hobbies.map((hobby, index) => (
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

export default ProfilePopup;
