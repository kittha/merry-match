import { useEffect, useState, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../../public/assets/registerpage/calendar.png";

function BasicInformationSection() {
  const { formData, handleChange, errors } = useForm();
  const [cities, setCities] = useState([]);
  const [selectDate, setSelectDate] = useState(null);

  useEffect(() => {
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
      <div className="flex flex-col w-full  lg:w-[930px]">
        <h1 className="basicInformation text-[#2A2E3F] font-[700] text-[24px]">
          Basic Information
        </h1>
        <div className="column1 flex lg:mt-[24px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
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
              placeholder={formData.name || "Name"}
              required
              onChange={(event) => {
                handleChange("name", event.target.value);
              }}
            />
            {errors.name && <div className="error">{errors.name}</div>}
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
              className="h-[24px] w-[24px] absolute top-[52px] right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={handleIconClick}
            />
            {errors.birthday && <div className="error">{errors.birthday}</div>}
          </div>
        </div>

        <div className="column3 flex lg:mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
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
            {errors.country && <div className="error">{errors.country}</div>}
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
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
        </div>

        <div className="column flex  lg:mt-[40px] lg:flex-row flex-col-reverse lg:gap-0 gap-[30px]">
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
            {errors.username && <div className="error">{errors.username}</div>}
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
