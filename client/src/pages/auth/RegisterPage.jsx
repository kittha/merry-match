import React, { useState } from "react";
import Countrydata from "/src/mock-city/Countrydata.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterPage = () => {
  const [state, setState] = useState([]);
  const [step, setStep] = useState(1);

  //states form 1
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

  const handleNext = () => {
    if (step !== 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex justify-center items-center flex-col w-4/5 h-[950px]">
          <header className="flex flex-row items-center justify-evenly w-[90vw] h-[20%] mt-[150px] mb-[2%]">
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm text-[#7B4429] mb-1">REGISTER</p>
              <h1 className="text-5xl text-[#A62D82] leading-[125%] drop-shadow-md font-extrabold w-full text-left">
                Join us and start <br /> matching
              </h1>
            </div>
            <div className="flex flex-row items-center">
              {step === 1 && (
                <div className="w-[430px] h-[80px] flex flex-row items-center ml-[30%] ">
                  {/* Content */}
                  <div className="w-[246px] h-[80px] shrink border-[1px] ml-1 mr-1 border-[#A62D82] rounded-3xl flex flex-row items-center justify-evenly">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] text-[#A62D82] font-[700]">1</p>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-[#646D89] text-[12px]">Step 1/3</p>
                      <p className="text-[#A62D82] font-[800] text-[16px]">
                        Basic Information
                      </p>
                    </div>
                  </div>

                  <div className="w-[80px] h-[80px] border-[1px] ml-1 mr-1 border-[#E4E6ED] rounded-3xl text-center text-[#C8CCDB]  flex flex-col items-center justify-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] text-[#9aa1b9] font-[700]">2</p>
                    </div>
                  </div>

                  <div className="w-[80px] h-[80px] border-[1px] ml-1 mr-1 border-[#E4E6ED] rounded-3xl text-center text-[#C8CCDB]  flex flex-col items-center justify-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] text-[#9aa1b9] font-[700]">3</p>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="w-[472px] h-[80px] flex flex-row items-center ml-[30%]">
                  <div className="w-[80px] h-[80px] border-[1px] ml-1 mr-1 border-[#E4E6ED] rounded-3xl text-center text-[#C8CCDB] flex flex-col justify-center items-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col justify-center items-center ">
                      <p className="text-[24px] font-[700] text-[#9aa1b9]">1</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="w-[266px] h-[80px] shrink border-[1px] ml-1 mr-1 border-[#A62D82] rounded-3xl flex flex-row items-center justify-evenly">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col justify-center items-center">
                      <p className=" text-[24px] text-[#A62D82] font-[700]">
                        2
                      </p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-[#646D89] text-[12px]">Step 2/3</p>
                      <p className="text-[16px] text-[#A62D82] font-[800]">
                        Identities and Interests
                      </p>
                    </div>
                  </div>

                  <div className="w-[80px] h-[80px] border-[1px] ml-1 mr-1 border-[#E4E6ED] rounded-3xl text-center text-[#C8CCDB] flex flex-col justify-center items-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col justify-center items-center">
                      <p className="text-[24px] font-[700] text-[#9aa1b9]">3</p>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="w-[409px] h-[80px] flex flex-row items-center ml-[20%]">
                  <div className="w-[80px] h-[80px] border-[1px] ml-1 mr-1 rounded-3xl text-center text-[#C8CCDB]  flex flex-col items-center justify-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] font-[700] text-[#9aa1b9]">1</p>
                    </div>
                  </div>
                  <div className="w-[80px] h-[80px]  border-[1px] ml-1 mr-1  rounded-3xl text-center text-[#C8CCDB]  flex flex-col items-center justify-center">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] font-[700] text-[#9aa1b9]">2</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="w-[225px] h-[80px] shrink border-[1px] ml-1 mr-1 border-[#A62D82] rounded-3xl relative flex flex-row items-center justify-evenly">
                    <div className=" bg-[#F1F2F6] w-[48px] h-[48px] rounded-2xl flex flex-col items-center justify-center">
                      <p className="text-[24px] text-[#A62D82] font-[700]">3</p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-[#646D89] text-[12px]">Step 3/3</p>
                      <p className="text-[#A62D82] text-[16px] font-[800]">
                        Upload Photos
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>
          {/* Form input */}
          {step === 1 && (
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
          )}
          {step === 2 && (
            <div className="w-full flex flex-col items-center">
              {/* Add step 2 form fields here */}
            </div>
          )}
          {step === 3 && (
            <div className="w-full flex flex-col items-center">
              {/* Add step 3 form fields here */}
            </div>
          )}
          {/*  Button  */}
          <div className="flex w-full justify-end mt-4">
            {/* Back button */}
            <button
              onClick={handleBack}
              type="button"
              className="text-[#C70039] hover:text-black font-[800] "
            >
              🡐 Back
            </button>

            {/* Next button */}
            {step === 1 && (
              <button
                type=""
                onClick={handleNext}
                className="mt-[0.5%] text-white bg-[#C70039] hover:bg-red-800  font-[800] rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-5"
              >
                Next step
              </button>
            )}
            {step === 2 && (
              <button
                type=""
                onClick={handleNext}
                className="mt-[0.5%] text-white  font-[800] bg-[#C70039] hover:bg-red-800 rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-5"
              >
                Next step
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="mt-[0.5%] text-white bg-[#C70039] hover:bg-red-800 font-[700] rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:bg-[#F1F2F6] disabled:text-[#646D89] ml-5"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
