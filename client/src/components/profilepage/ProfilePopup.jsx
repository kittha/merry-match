import React from "react";
import exit from "../../../public/assets/profilepicture/exit.png"
import john from "../../../public/assets/profilepicture/john.png"
import crossbutton from "../../../public/assets/profilepicture/crossbutton.png"
import lovebutton from "../../../public/assets/profilepicture/lovebutton.png"
import arrowL from "../../../public/assets/profilepicture/arrowL.png"
import arrowR from "../../../public/assets/profilepicture/arrowR.png"
import location from "../../../public/assets/profilepicture/location.png"
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
      //setAvatars(result.data.avatars)
      //setAboutMe(result.data.bio);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);


    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[1064px] h-[740px]  mx-auto rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex justify-end pr-4">
          <p>
            <button
              onClick={onClose}
            ><img src={exit} alt="exit"/></button>
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
            <p className="text-[46px] text-[#2A2E3F]">{name}</p>
            <p className="text-[46px] text-[#646D89] ml-[16px]">{calculateAge(birthday)}</p>
            </div>
    
            <div className="flex">
            <img classname="w-[17px] h-[22px]" src={location} alt="" />
            <div className="flex ml-[20px]  text-[#646D89]">
            <p>{city}</p>
            <p>,</p>
            <p>{country}</p>
            </div>
          </div>
  
          <div className=" flex flex-col font-Nunito">
              {/* col1 */}
              <div className="col1 flex mt-[50px]">  
              <p className="w-[191px] text-[16px]">Sexual identities </p>
              <p className="text-[#646D89]">{sexualIdentity}</p>
              </div>
            
              {/* col2 */}
              <div className="col2 flex mt-[20px]"> 
              <p className="w-[191px]">Sexual preferences</p>
              <p className="text-[#646D89]">{sexualPreference}</p>
              </div>
              
            {/* col3 */}
              <div className="col3 flex mt-[20px]">
              <p className="w-[191px]">Racial preferences</p>
              <p className="text-[#646D89]">{racialPreference}</p>
              </div>
  
              {/* col4 */}
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
                <p> {hobby}</p>
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