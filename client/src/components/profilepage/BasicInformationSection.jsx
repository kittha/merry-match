import { useContext, useEffect, useState, useRef } from "react";
import { FormContext } from "../../contexts/FormProvider";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../../public/assets/registerpage/calendar.png";
import "../../App.css";
import { getProfileData } from "../../hooks/profile.controller.mjs";
import { useParams } from "react-router-dom";

function BasicInformationSection() {
  const { formData, setFormData, handleChange } = useContext(FormContext);
  const [cities, setCities] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const { userId } = useParams();
  const fetchData = async () => {
    const data = await getProfileData(userId);
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
    console.log(formData);

    if (formData.country) {
      const selectedCountry = Countrydata.find(
        (country) => country.country_name === formData.country
      );
      if (selectedCountry) {
        setCities(selectedCountry.states);
      }
    }
    if (formData.birthday) {
      setSelectDate(new Date(formData.birthday));
    }
  }, [formData.country, formData.birthday]);

  const handleCountry = (event) => {
    const getCountryId = event.target.value;
    const getStateData = Countrydata.find(
      (country) => country.country_name === getCountryId
    ).states;
    setCities(getStateData);
    handleChange("country", getCountryId);
  };

  const datePickerRef = useRef(null);
  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

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
              value={formData.name}
              placeholder="Name"
              required
              onChange={(event) => {
                handleChange("name", event.target.value);
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
              selected={formData.birthday}
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setSelectDate(date);
                handleChange("birthday", date);
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
              onChange={(event) => handleCountry(event)}
              value={formData.country}
              required
            >
              <option disabled value="">
                {formData.country}
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
              onChange={(event) => handleChange("city", event.target.value)}
              value={formData.city}
              required
            >
              <option disabled value="">
                {formData.city}
              </option>
              {cities.map((getStateData, index) => (
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
              value={formData.username}
              onChange={(event) => handleChange("username", event.target.value)}
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
              value={formData.email}
              // onChange={(event) => handleChange("email", event.target.value)}
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
