import { useState } from "react";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BasicInformation() {
  //states form 1
  const [state, setState] = useState([]);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //DatePicker
  const [selectDate, setSelectDate] = useState(null);

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

  return (
    <div className="w-[105%] h-[80%] flex justify-center">
      <div className="flex flex-col  w-[full]">
        <h1 className="basicInformation text-[#A62D82] mt-[20px] font-[800] text-[24px]">
          Basic Information
        </h1>
        <div className="column1 flex">
          <div className="flex flex-col mr-[12px] mt-[24px]">
            <label htmlFor="name" className="font-[600] ">
              Name
            </label>
            <input
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
              id="name"
              value={name}
              placeholder="Name"
              required
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-col ml-[12px] mt-[24px]">
            <label htmlFor="birth" className="font-[600]">
              Date of birth
            </label>

            <DatePicker
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
              selected={selectDate}
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setSelectDate(date);
              }}
            />
          </div>
        </div>
        <div className="column2 flex">
          <div className="flex flex-col mr-[12px] mt-[40px]">
            <label htmlFor="location" className="font-[600]">
              Location
            </label>
            <select
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
              onChange={(e) => handleCountry(e)}
              value={country}
              required
            >
              <option disabled value="">
                -- Select Country--
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

          <div className="flex flex-col ml-[12px] mt-[40px]">
            <label htmlFor="city" className="font-[600]">
              City
            </label>
            <select
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
              onChange={(e) => handleState(e)}
              value={city}
              required
            >
              <option disabled value="">
                -- Select City --
              </option>
              {state.map((getStateData, index) => (
                <option value={getStateData.state_name} key={index}>
                  {getStateData.state_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="column3 flex">
          <div className="flex flex-col mr-[12px] mt-[24px]">
            <label htmlFor="username" className="font-[600] ">
              Username
            </label>
            <input
              type="text"
              placeholder="At least 6 characters"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col ml-[12px] mt-[24px]">
            <label htmlFor="email" className="font-[600]">
              Email
            </label>

            <input
              type="email"
              placeholder="name@website.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
            />
          </div>
        </div>

        <div className="column4 flex">
          <div className="flex flex-col mr-[12px] mt-[24px]">
            <label htmlFor="password" className="font-[600] ">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col ml-[12px] mt-[24px]">
            <label htmlFor="confirmpassword" className="font-[600]">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="At least 8 characters"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[453px] h-[48px] border-[#D6D9E4] rounded-lg p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
