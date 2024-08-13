import { useState } from "react";
import exit from "/assets/profilepicture/exit.png";
import arrowL from "/assets/profilepicture/arrowL.png";
import arrowR from "/assets/profilepicture/arrowR.png";
import location from "/assets/profilepicture/location.png";
import arrowB from "/assets/profilepicture/arrowB.png";
import UnmatchModalPopup from "../../components/merry-list/UnmatchPopup";
import { Country, State } from "country-state-city";
const ProfileMatchAndMerryPopup = ({ user, onClose }) => {
  const avatarsArr = Object.values(user.avatars || {});
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [showModalUnmatch, setShowModalUnmatch] = useState(false); // Modal Unmatch visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for the modal

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % avatarsArr.length);
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex(
      (prevIndex) => (prevIndex - 1 + avatarsArr.length) % avatarsArr.length
    );
  };

  const calculateAge = (date_of_birth) => {
    const dob = new Date(date_of_birth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const getCountryName = (isoCode) => {
    const country = Country.getCountryByCode(isoCode);
    return country ? country.name : isoCode;
  };
  const getStateName = (countryIsoCode, stateIsoCode) => {
    const state = State.getStateByCodeAndCountry(stateIsoCode, countryIsoCode);
    return state ? state.name : stateIsoCode;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000022] z-30 lg:z-50">
      <div className="overflow-scroll lg:overflow-hidden py-8 bg-white lg:w-[1064px] lg:h-[740px] w-full h-full mx-auto lg:rounded-[32px] rounded-0 shadow-lg">
        <div className="flex justify-end pr-4">
          <button onClick={onClose}>
            <img className="hidden lg:block" src={exit} alt="exit" />
          </button>
        </div>
        <div className="flex justify-start pl-0 pt-0">
          <button onClick={onClose}>
            <img
              className="block lg:hidden absolute z-30 pt-10 pl-8 filter drop-shadow-[3px_3px_5px_gray]"
              src={arrowB}
              alt="exit"
            />
          </button>
        </div>
        <div className="lg:flex flex-row">
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="lg:w-[400px] lg:h-[400px] w-screen h-[356px] rounded-2xl">
              {avatarsArr.length > 0 ? (
                <img
                  className="rounded-2xl bg-cover lg:w-[400px] lg:h-[400px] w-screen h-[315px]"
                  src={avatarsArr[currentAvatarIndex]}
                  alt="profile"
                />
              ) : (
                <div className="rounded-2xl lg:w-[400px] lg:h-[400px] w-screen h-[315px] bg-gray-200 flex justify-center items-center">
                  <p className="text-gray-500 text-center">
                    No Image Available
                  </p>
                </div>
              )}

              <div className="flex justify-between px-8 -translate-y-20">
                <div className="PhotoCount flex mt-[92px]">
                  <p>
                    {currentAvatarIndex + 1}/{avatarsArr.length}
                  </p>
                </div>
                <div className="arrowBtn flex mt-[80px]">
                  <button onClick={handlePrevAvatar}>
                    <img src={arrowL} alt="leftArrow" />
                  </button>
                  <button onClick={handleNextAvatar}>
                    <img src={arrowR} alt="rightArrow" />
                  </button>
                </div>
              </div>
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
                    {getStateName(user.country, user.city)},{" "}
                    {getCountryName(user.country)}
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
                    {hobby}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalUnmatch && selectedUser ? (
        <UnmatchModalPopup
          user={selectedUser}
          onClose={() => setShowModalUnmatch(false)}
        />
      ) : null}
    </div>
  );
};

export default ProfileMatchAndMerryPopup;
