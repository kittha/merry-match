import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

function IdentitiesSection() {
  const { formData, handleChange, addHobby, deleteHobby, errors } = useForm();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (formData.hobbies.length < 10) {
        addHobby(inputValue);
        setInputValue("");
      } else {
        alert("You can only add up to 10 hobbies.");
      }
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-[930px] lg:gap-0 gap-[-30px]">
      <h1 className="IdentitiesAndInterestes text-[#2A2E3F] font-[700] text-[24px] leading-[30px]">
        Identities and Interests
      </h1>
      <div className="column1 flex lg:mt-[24px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
        <div className="flex flex-col lg:mr-[12px] mb-[12px] lg:mb-0">
          <label
            htmlFor="SexualIdentities"
            className="font-[400] text-[16px] leading-[24px]"
          >
            Sexual identities
          </label>
          <select
            className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
            id="name"
            value={formData.sexualIdentity}
            onChange={(event) => {
              handleChange("sexualIdentity", event.target.value);
            }}
            required
          >
            <option disabled value="">
              {formData.sexualIdentity}
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.sexualIdentity && (
            <div className="error">{errors.sexualIdentity}</div>
          )}
        </div>

        <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px]">
          <label
            htmlFor="SexualPreferences"
            className="font-[400] text-[16px] leading-[24px]"
          >
            Sexual preferences
          </label>
          <select
            className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
            id="name"
            value={formData.sexualPreference}
            onChange={(event) => {
              handleChange("sexualPreference", event.target.value);
            }}
            required
          >
            <option disabled value="">
              {formData.sexualPreference}
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.sexualPreference && (
            <div className="error">{errors.sexualPreference}</div>
          )}
        </div>
      </div>

      <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
        <div className="flex flex-col lg:mr-[12px] mb-[12px] lg:mb-0">
          <label
            htmlFor="RacialPreferences"
            className="font-[400] text-[16px] leading-[24px]"
          >
            Racial preferences
          </label>
          <select
            className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
            id="name"
            value={formData.racialPreference}
            onChange={(event) => {
              handleChange("racialPreference", event.target.value);
            }}
            required
          >
            <option disabled value="">
              {formData.racialPreference}
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
          {errors.racialPreference && (
            <div className="error">{errors.racialPreference}</div>
          )}
        </div>

        <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] ">
          <label
            htmlFor="MeetingInterests"
            className="font-[400] text-[16px] leading-[24px]"
          >
            Meeting interests
          </label>
          <select
            className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
            id="name"
            value={formData.meetingInterest}
            onChange={(event) => {
              handleChange("meetingInterest", event.target.value);
            }}
            required
          >
            <option disabled value="">
              {formData.meetingInterest}
            </option>
            <option value="Long-term">Long-term Relationships</option>
            <option value="Casual">Casual Dating</option>
            <option value="Friendship">Friendship</option>
            <option value="Niche">Niche Dating</option>
          </select>
          {errors.meetingInterest && (
            <div className="error">{errors.meetingInterest}</div>
          )}
        </div>
      </div>

      <div className="column3 flex flex-col mt-[24px] lg:mt-[40px]">
        <div className="flex flex-col">
          <label
            htmlFor="Hobbies"
            className="font-[400] text-[16px] leading-[24px]"
          >
            Hobbies / Interests (Maximum 10)
          </label>
          <div className="flex flex-row flex-wrap  border-[1px] border-[#D6D9E4] rounded-[8px] gap-[8px] pt-[12px] pr-[16px] pb-[12px] pl-[12px] w-full lg:w-[930px] mt-[4px]">
            {formData.hobbies.map((item, index) => (
              <div
                key={index}
                className="flex items-center  h-[29px] px-[8px] py-[4px]  gap-[8px] rounded-[6px] bg-[#F4EBF2] text-[#7D2262]"
              >
                <span>{item}</span>
                <button onClick={() => deleteHobby(index)}>x</button>
              </div>
            ))}
            <input
              className="border-[1px] font-normal border-none rounded-lg py-[12px] px-[12px] focus:outline-none flex-grow h-[29px]"
              type="text"
              id="Hobbies"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {errors.hobbies && <div className="error">{errors.hobbies}</div>}
        </div>
      </div>

      <div className="column3 flex flex-col mt-[24px] lg:mt-[40px]">
        <div className="flex flex-col">
          <label
            htmlFor="Hobbies"
            className="font-[400] text-[16px] leading-[24px]"
          >
            About me (Maximum 150 characters)
          </label>

          <textarea
            className="textarea lg:w-[931px] w-auto h-[120px] rounded-[8px] border border-1 pt-3 pl-3 pb-3 pr-3 resize-none"
            placeholder="I know nothing..but you"
            value={formData.bio || ""}
            onChange={(event) => {
              const text = event.target.value;
              if (text.length <= 150) {
                handleChange("bio", text);
              }
            }}
          >
            {formData.bio}
          </textarea>
        </div>
      </div>
    </div>
  );
}
export default IdentitiesSection;
