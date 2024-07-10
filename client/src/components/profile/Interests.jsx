import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

function IdentitiesAndInterests() {
  //states form 2

  const [sexualIdentity, setSexualIdentity] = useState("");
  const [sexualPreference, setSexualPreference] = useState("");
  const [racialPreference, setRacialPreference] = useState("");
  const [meetingInterest, setMeetingInterest] = useState("");

  //states hobbies
  const [hobby, setHobby] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newHobbies = [...hobby, inputValue];
      setHobby(newHobbies);
      setInputValue("");
    }
  };
  const deleteHobby = (index) => {
    const newHobbies = [...hobby];
    newHobbies.splice(index, 1);
    setHobby(newHobbies);
  };
  return (
    <div className="w-[100%] h-[80%] flex justify-center mb-[223px] mt-[80px]">
      <div className="flex flex-col  w-[full]">
        <h1 className="IdentitiesAndInterestes text-[#A62D82] mt-[20px] font-[700] text-[24px] leading-[30px]">
          Identities and Interestes
        </h1>
        <div className="column1 flex mt-[24px]">
          <div className="flex flex-col mr-[12px] ">
            <label
              htmlFor="SexualIdentities"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Sexual identities
            </label>
            <select
              className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
              id="name"
              value={sexualIdentity}
              onChange={(event) => {
                setSexualIdentity(event.target.value);
              }}
            >
              <option disabled value="">
                Select Your Sexual Identity
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col ml-[12px] ">
            <label
              htmlFor="SexualPreferences"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Sexual preferences
            </label>

            <select
              className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
              id="name"
              value={sexualPreference}
              onChange={(event) => {
                setSexualPreference(event.target.value);
              }}
            >
              <option disabled value="">
                Select Your Sexual Preference
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="column2 flex mt-[40px]">
          <div className="flex flex-col mr-[12px] ">
            <label
              htmlFor="RacialPreferences"
              className="font-[400] text-[16px] leading-[24px]]"
            >
              Racial preferences
            </label>

            <select
              className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
              id="name"
              value={racialPreference}
              onChange={(event) => {
                setRacialPreference(event.target.value);
              }}
            >
              <option disabled value="">
                Select Your Sexual Preference
              </option>
              <option value="Asian">Asian</option>
              <option value="Black or African American">
                Black or African American
              </option>
              <option value="Hispanic or Latino">Hispanic or Latino</option>
              <option value="Native American or Alaska Native">
                Native American or Alaska Native
              </option>
              <option value="Native Hawaiian or Other Pacific Islander">
                Native Hawaiian or Other Pacific Islander
              </option>
              <option value="White">White</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="flex flex-col ml-[12px]">
            <label
              htmlFor="MeetingInterests"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Meeting interests
            </label>

            <select
              className="w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
              id="name"
              value={meetingInterest}
              onChange={(event) => {
                setMeetingInterest(event.target.value);
              }}
            >
              <option disabled value="">
                Select Your Meeting Interests
              </option>
              <option value="Long-term">Long-term Relationships</option>
              <option value="Casual">Casual Dating</option>
              <option value="Friendship">Friendship</option>
              <option value="Niche">Niche Dating</option>
            </select>
          </div>
        </div>

        <div className="column3 flex flex-col mt-[40px]">
          <div className="flex flex-col mr-[12px] ">
            <label
              htmlFor="Hobbies"
              className="font-[400] text-[16px] leading-[24px]]"
            >
              Hobbies / Interests (Maximum 10)
            </label>
            <div className="flex flex-row border-[1px] border-[#D6D9E4] rounded-[8px] gap-[8px] pt-[12px] pr-[16px] pb-[12px] pl-[12px] w-[930px] h-[53px] mt-[4px]">
              {hobby.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-[4px] py-[8px] gap-[8px] rounded-[6px] bg-[#F4EBF2] text-[#7D2262]"
                >
                  <span className="">{item}</span>
                  <button className="" onClick={() => deleteHobby(index)}>
                    x
                  </button>
                </div>
              ))}
              <input
                className="border-[1px] font-normal border-none rounded-lg py-[12px] px-[12px] focus:outline-none w-full"
                type="text"
                id="Hobbies"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentitiesAndInterests;
