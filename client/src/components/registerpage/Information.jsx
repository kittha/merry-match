import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../../public/assets/registerpage/calendar.png";
import EyeIconClosed from "../../../public/assets/registerpage/EyeIconClosed.png";
import EyeIconOpen from "../../../public/assets/registerpage/EyeIconOpen.png";

import "../../App.css";

function BasicInformation() {
  const { formData, handleChange, errors } = useForm();
  const [state, setState] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = Countrydata.find(
        (country) => country.country_name === formData.country
      );
      if (selectedCountry) {
        setState(selectedCountry.states);
      }
    }
    if (formData.birthday) {
      setSelectDate(new Date(formData.birthday));
    }
  }, [formData.country, formData.birthday]);

  const handleCountry = (e) => {
    const getCountryId = e.target.value;
    const getStateData = Countrydata.find(
      (country) => country.country_name === getCountryId
    ).states;
    setState(getStateData);
    handleChange("country", getCountryId);
  };

  const handleState = (e) => {
    const city = e.target.value;
    handleChange("city", city);
  };
  const datePickerRef = useRef(null);
  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="w-[100%] h-[80%] flex justify-center mb-[35px] lg:mb-[112px] mt-[37px] lg:mt-[80px]">
      <div className="flex flex-col w-screen lg:w-[930px]">
        <h1 className="basicInformation text-[#A62D82] font-[700] text-[24px]">
          Basic Information
        </h1>
        <div className="column1 flex mt-[24px] lg:flex-row flex-col">
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
              onChange={(event) => handleChange("name", event.target.value)}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="relative flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px]">
            <label
              htmlFor="birth"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Date of birth
            </label>

            <DatePicker
              ref={datePickerRef}
              className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
              selected={selectDate}
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
        <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col">
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
              value={formData.country}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {Countrydata.map((getcountry, index) => (
                <option
                  className="text-black"
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
              onChange={(e) => handleState(e)}
              value={formData.city}
              required
            >
              <option disabled value="">
                Select City
              </option>
              {state.map((getStateData, index) => (
                <option
                  value={getStateData.state_name}
                  key={index}
                  className="text-black"
                >
                  {getStateData.state_name}
                </option>
              ))}
            </select>
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
        </div>

        <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col">
          <div className="flex flex-col lg:mr-[12px]">
            <label
              htmlFor="username"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="At least 6 characters"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
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
              placeholder="name@website.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
        </div>

        <div className="column2 flex mt-[24px] lg:mt-[40px] lg:flex-row flex-col">
          <div className="flex flex-col lg:mr-[12px] relative">
            <label
              htmlFor="password"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
            />
            <img
              src={showPassword ? EyeIconOpen : EyeIconClosed}
              alt="Toggle visibility"
              className="h-[24px] w-[24px] absolute top-[52px] right-4 transform -translate-y-1/2 cursor-pointer opacity-50"
              onClick={togglePasswordVisibility}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="relative flex flex-col lg:ml-[12px] lg:mt-[0px] mt-[24px]">
            <label
              htmlFor="confirmpassword"
              className="font-[400] text-[16px] leading-[24px]"
            >
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="w-full lg:w-[453px] h-[48px] border border-[#D6D9E4] rounded-lg pt-[12px] pr-[16px] pb-[12px] pl-[12px] mt-[4px]"
            />
            <img
              src={showConfirmPassword ? EyeIconOpen : EyeIconClosed}
              alt="Toggle visibility"
              className="h-[24px] w-[24px] absolute top-[52px] right-4 transform -translate-y-1/2 cursor-pointer opacity-50"
              onClick={toggleConfirmPasswordVisibility}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
