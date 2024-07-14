import { useState, useRef } from "react";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import plus from "../../assets/profilepicture/plus.png";
import Footer from "../../components/homepage/Footer";
import NavbarAuthen from "../../components/navbar/NavbarAuthen";

function UserProfilePage() {
  const [state, setState] = useState([]);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  //DatePicker
  const [selectDate, setSelectDate] = useState(null);

  const datePickerRef = useRef(null);

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the date picker programmatically
    }
  };

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    const getStateData = Countrydata.find(
      (country) => country.country_name === getCountryId
    ).states;
    setState(getStateData);
    setCountry(getCountryId);
  };

  const handleState = (e) => {
    const city = e.target.value;
    setCity(city);
  };

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

  const [avatars, setAvatars] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleFileChange = (event, avatarKey) => {
    const selectedFile = event.target.files[0];
    setAvatars((prevAvatars) => ({
      ...prevAvatars,
      [avatarKey]: selectedFile,
    }));
    event.target.value = null;
  };

  const handleDeleteClick = (avatarKey) => {
    setAvatars((prevAvatars) => ({
      ...prevAvatars,
      [avatarKey]: null,
    }));
  };

  const handleDragStart = (event, avatarKey) => {
    event.dataTransfer.setData("avatarKey", avatarKey);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetAvatarKey) => {
    const sourceAvatarKey = event.dataTransfer.getData("avatarKey");
    if (sourceAvatarKey !== targetAvatarKey) {
      const updatedAvatars = { ...avatars };
      const temp = updatedAvatars[targetAvatarKey];
      updatedAvatars[targetAvatarKey] = updatedAvatars[sourceAvatarKey];
      updatedAvatars[sourceAvatarKey] = temp;
      setAvatars(updatedAvatars);
    }
  };

  return (
    <>
      <div className="lg:w-screen w-auto lg:h-screen bg-[#FCFCFE] flex flex-col gap-[80px]">
        <div className="lg:w-screen w-auto mx-auto  bg-[#FCFCFE]">
          <nav className="lg:w-[562.67px] w-auto lg:mb-[120px] mb-[50px]">
            <NavbarAuthen />
          </nav>

          <div className="lg:w-[931px] lg:h-[1647px] w-auto h-auto flex flex-col items-center lg:items-end gap-[80px] pb-[50px] mx-auto font-Nunito">
            <div className="lg:w-[931px] h-[145px] w-auto flex lg:flex-row flex-col lg:gap-[80px] gap-[20px]">
              <header className="lg:w-[517px] h-[145px] flex flex-col gap-[8px] lg:mt-0 mt-[60px] lg:pl-0 pl-[20px]">
                <p className="text-[#7B4429] font-semibold text-base leading-6 w-[517px] h-[21px]">
                  PROFILE
                </p>

                <h2 className="text-[#A62D82] text-[46px] leading-[57.5px] font-extrabold text-left lg:w-[517px] w-auto lg:h-[116px] h-auto">
                  Let’s make profile <br /> to let others know you
                </h2>
              </header>
              <div className="lg:w-[414px] w-[338px] lg:h-[145px] h-[48px] flex flex-row items-end justify-center lg:mt-0 md:mt-[2300px] mt-[2450px] mx-auto">
                <div className="flex gap-[16px]">
                  <button className="w-[162px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full p-[12px 24px] bg-[#FFE1EA] text-[#95002B] text-center font-bold text-base leading-6">
                    Preview Profile
                  </button>
                  <button className="w-[156px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full font-bold text-base leading-6 text-center text-[#FFFFFF] bg-[#C70039]">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:pl-0 lg:pr-0 pl-[16px] pr-[16px] lg:w-[930px] lg:mt-[5px] mt-[40px]">
              <h1 className="basicInformation text-[#2A2E3F] font-[700] text-[24px]">
                Basic Information
              </h1>
              <div className="column1 flex mt-[24px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
                <div className="flex flex-col lg:mr-[12px]">
                  <label
                    htmlFor="name"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Name
                  </label>
                  <input
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                    id="name"
                    value={name}
                    placeholder="Name"
                    required
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>

                <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px] relative">
                  <label
                    htmlFor="birth"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Date of birth
                  </label>

                  <DatePicker
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                    ref={datePickerRef}
                    selected={selectDate}
                    placeholderText="Select date"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setSelectDate(date);
                    }}
                    disabled
                  />
                  <img
                    src="./src/assets/userProfile/calendar.png"
                    alt="calendar"
                    className="h-[24px] w-[24px] absolute top-12 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleIconClick}
                  />
                </div>
              </div>
              <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
                <div className="flex flex-col lg:mr-[12px]">
                  <label
                    htmlFor="location"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Location
                  </label>
                  <select
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                    onChange={(e) => handleCountry(e)}
                    value={country}
                    required
                  >
                    <option disabled value="">
                      Select Country
                    </option>
                    {Countrydata.map((getcountry, index) => (
                      <option
                        className=""
                        value={getcountry.country_name}
                        key={index}
                      >
                        {getcountry.country_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px]">
                  <label
                    htmlFor="city"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    City
                  </label>
                  <select
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                    onChange={(e) => handleState(e)}
                    value={city}
                    required
                  >
                    <option disabled value="">
                      Select City
                    </option>
                    {state.map((getStateData, index) => (
                      <option value={getStateData.state_name} key={index}>
                        {getStateData.state_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
                <div className="flex flex-col lg:mr-[12px]">
                  <label
                    htmlFor="username"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="At least 6 characters"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                  />
                </div>

                <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px]">
                  <label
                    htmlFor="email"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="name@website.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full lg:pl-0 lg:pr-0 pl-[16px] pr-[16px] lg:w-[930px] lg:gap-0 gap-[-30px]">
              <h1 className="IdentitiesAndInterestes text-[#2A2E3F] font-[700] text-[24px] leading-[30px]">
                Identities and Interests
              </h1>
              <div className="column1 flex mt-[24px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
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

              <div className="column2 flex mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
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
                    value={racialPreference}
                    onChange={(event) => {
                      setRacialPreference(event.target.value);
                    }}
                  >
                    <option disabled value="">
                      Select Your Racial Preference
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">
                      Black or African American
                    </option>
                    <option value="Hispanic or Latino">
                      Hispanic or Latino
                    </option>
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

                <div className="flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px] ">
                  <label
                    htmlFor="MeetingInterests"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Meeting interests
                  </label>
                  <select
                    className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg p-2 mt-[4px]"
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
                <div className="flex flex-col">
                  <label
                    htmlFor="Hobbies"
                    className="font-[400] text-[16px] leading-[24px]"
                  >
                    Hobbies / Interests (Maximum 10)
                  </label>
                  <div className="flex flex-row flex-wrap border-[1px] border-[#D6D9E4] rounded-[8px] gap-[8px] pt-[12px] pr-[16px] pb-[12px] pl-[12px] w-full lg:w-[930px] mt-[4px]">
                    {hobby.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center px-[8px] py-[4px]  gap-[8px] rounded-[6px] bg-[#F4EBF2] text-[#7D2262]"
                      >
                        <span>{item}</span>
                        <button onClick={() => deleteHobby(index)}>x</button>
                      </div>
                    ))}
                    <input
                      className="border-[1px] font-normal border-none rounded-lg py-[12px] px-[12px] focus:outline-none flex-grow min-w-[200px]"
                      type="text"
                      id="Hobbies"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </div>

              <div className="column3 flex flex-col mt-[40px]">
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
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full lg:pl-0 lg:pr-0 pl-[16px] pr-[16px] lg:w-[930px]">
              <div className="section-header">
                <h2 className=" text-[#A62D82] text-[24px] font-[700] leading-[30px] lg:text-left">
                  Profile pictures
                </h2>
                <p className="text-[#424C6B] text-[16px] font-[400] leading-[24px] mt-[4px] lg:text-left">
                  Upload at least 2 photos
                </p>
              </div>
              <div className="picture-list lg:w-auto flex lg:flex-row flex-wrap lg:gap-[22px] gap-[22px] mt-[24px] mx-auto lg:mx-0 w-full">
                {Object.keys(avatars).map((avatarKey) => (
                  <div
                    key={avatarKey}
                    className="input-container"
                    draggable
                    onDragStart={(event) => handleDragStart(event, avatarKey)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, avatarKey)}
                  >
                    {avatars[avatarKey] ? (
                      <div className="image-preview-container w-[167px] h-[167px] relative">
                        <img
                          key={avatarKey}
                          className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
                          src={URL.createObjectURL(avatars[avatarKey])}
                          alt={`Preview ${avatarKey}`}
                        />
                        <button
                          className="deleteButton w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white flex justify-center items-center absolute top-2 right-2"
                          onClick={() => handleDeleteClick(avatarKey)}
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      <label htmlFor={`upload-${avatarKey}`}>
                        <div className="upload-placeholder gap-2 w-[167px] h-[167px]  bg-[#F1F2F6] rounded-2xl flex flex-col justify-center items-center cursor-pointer text-[#7D2262]">
                          <img src={plus}></img>
                          <p className="text-[14px] font-[500]">Upload photo</p>
                        </div>
                      </label>
                    )}
                    <input
                      id={`upload-${avatarKey}`}
                      name="avatar"
                      type="file"
                      onChange={(event) => handleFileChange(event, avatarKey)}
                      hidden
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[128px] h-[32px] rounded-[16px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] lg:mt-[-10px] mt-[60px]">
              <button className="w-[112px] h-[24px] font-semibold text-[16px] leading-[24px] text-[#646D89]">
                Delete account
              </button>
            </div>
          </div>
          <footer className="lg:w-screen w-auto lg:mt-[150px]">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}
export default UserProfilePage;
