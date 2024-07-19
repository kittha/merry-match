import React from "react";
import exit from "../../../public/assets/profilepicture/exit.png"
import crossbutton from "../../../public/assets/profilepicture/crossbutton.png"
import lovebutton from "../../../public/assets/profilepicture/lovebutton.png"
import arrowL from "../../../public/assets/profilepicture/arrowL.png"
import arrowR from "../../../public/assets/profilepicture/arrowR.png"
import location from "../../../public/assets/profilepicture/location.png"
import arrowB from "../../../public/assets/profilepicture/arrowB.png"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProfilePopup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [sexualIdentity, setSexualIdentity] = useState("");
  const [sexualPreference, setSexualPreference] = useState("");
  const [racialPreference, setRacialPreference] = useState("");
  const [meetingInterest, setMeetingInterest] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [bio, setBio] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const { userId } = useParams();

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getUserProfile = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${userId}`
      );
      console.log(result);
      setName(result.data.name);
      setCountry(result.data.location);
      setCity(result.data.city);
      setBirthday(result.data.date_of_birth);
      setSexualIdentity(result.data.sexual_identities);
      setSexualPreference(result.data.sexual_preferences);
      setRacialPreference(result.data.racial_preferences);
      setMeetingInterest(result.data.meeting_interests);
      setHobbies(result.data.hobbies);
      setBio(result.data.bio);
      setAvatars(result.data.avatars);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === avatars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex === 0 ? avatars.length - 1 : prevIndex - 1
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
            <img className="block lg:hidden absolute z-30 pt-10 pl-8" src={arrowB} alt="exit" />
          </button>
        </div>
        <div className="lg:flex flex-row">
          <div className="lg:Lside lg:w-1/2 flex justify-center relative">
            <div className="lg:w-[400px] lg:h-[400px] rounded-2xl">
              {avatars.length > 0 && (
                <>
                  <img className="rounded-2xl hidden lg:block" src={avatars[currentAvatarIndex]} alt="profile" />
                  <img className="rounded-2xl block lg:hidden" src={avatars[currentAvatarIndex]} alt="profile" />
                  <div className="flex justify-center absolute left-[180px] lg:bottom-32 bottom-5">
                    <div className="flex justify-center rounded-md">
                      <button><img src={crossbutton} alt="cross" /></button>
                    </div>
                    <div className="flex justify-center rounded-md">
                      <button><img src={lovebutton} alt="love" /></button>
                    </div>
                  </div>
                  <div className="flex justify-between px-8 pt-4">
                    <div className="PhotoCount flex mt-2.5">
                      <div>{currentAvatarIndex + 1}</div>
                      <div>/</div>
                      <div>{avatars.length}</div>
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
                <p className="text-[46px] text-[#2A2E3F]">{name}</p>
                <p className="text-[46px] text-[#646D89] ml-[16px]">{calculateAge(birthday)}</p>
              </div>

              <div className="flex">
                <img src={location} />
                <div className="flex ml-[20px] text-[#646D89]">
                  <p>{city}</p>
                  <p>,</p>
                  <p>{country}</p>
                </div>
              </div>

              <div className="flex flex-col font-Nunito">
                <div className="col1 flex mt-[50px]">
                  <p className="w-[191px] text-[16px]">Sexual identities</p>
                  <p className="text-[#646D89]">{sexualIdentity}</p>
                </div>

                <div className="col2 flex mt-[20px]">
                  <p className="w-[191px]">Sexual preferences</p>
                  <p className="text-[#646D89]">{sexualPreference}</p>
                </div>

                <div className="col3 flex mt-[20px]">
                  <p className="w-[191px]">Racial preferences</p>
                  <p className="text-[#646D89]">{racialPreference}</p>
                </div>

                <div className="col4 flex mt-[20px]">
                  <p className="w-[191px]">Meeting interests</p>
                  <p className="text-[#646D89]">{meetingInterest}</p>
                </div>
              </div>

              <h1 className="mt-[50px] text-[24px] font-bold text-[#2A2E3F]">About me</h1>
              <div className="mt-[16px]">
                <p>{bio}</p>
              </div>
              <h1 className="mt-[40px] text-[24px] font-bold text-[#2A2E3F]">Hobbies and Interests</h1>
              <div className="flex mt-[24px]">
                {hobbies.map((hobby, index) => (
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
