import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProfileData } from "../../components/userprofilepage/useProfileData";
import CalendarIcon from "/assets/userprofile/calendar.png";


function BasicInformationSection() {
  const {
    state,
    name,
    setName,
    birthday,
    country,
    city,
    username,
    setUsername,
    email,
    setEmail,
    setSelectDate,
    datePickerRef,
    handleIconClick,
    handleCountry,
    handleState,
  } = useProfileData();


  return (
    <>

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
                    selected={birthday}
                    placeholderText="Select date"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                      setSelectDate(date);
                    }}
                  />
                  <img
                    src={CalendarIcon}
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
                      {country}
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
                      {city}
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

    </>      
  ); 
}
export default BasicInformationSection;
