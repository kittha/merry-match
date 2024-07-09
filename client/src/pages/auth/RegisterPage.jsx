import React, { useState } from "react";
import IdentitiesAndInterests from "../../components/profile/Interests";
import ProfilePictures from "../../components/profile/ProfilePictures";
import BasicInformation from "../../components/profile/Information";

const RegisterPage = () => {
  const [step, setStep] = useState(1);

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
      <div className="font-Nunito bg-[url('/src/assets/register/register-section-bg.svg')]  flex flex-col items-center justify-center w-screen h-screen bg-cover">
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
          {step === 1 && <BasicInformation />}
          {step === 2 && <IdentitiesAndInterests />}
          {step === 3 && (
            <div className="w-full flex flex-col items-center">
              {<ProfilePictures />}
            </div>
          )}
          {/*  Button  */}
          <div className=" w-[100vw] h-[10vh] mt-5 border-t border-[#E4E6ED] bg-[white] mb-5 pb-10 flex flex-col items-center justify-center">
            <div className=" w-[100vw]">
              <div className=" w-[100%] mt-[2%] flex flex-row justify-center content-end bg-[white]">
                <p className="flex justify-start items-start content-start mt-[1.5%] mr-[70%]">
                  {step === 1 && "1/3"} {step === 2 && "2/3"}{" "}
                  {step === 3 && "3/3"}
                </p>

                {/* Go Back button */}
                <button
                  onClick={handleBack}
                  type="button"
                  className="text-[#C70039] hover:text-black font-[800] "
                >
                  🡐 Back
                </button>

                {/* Go Next button */}
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
                {/* Submit button */}
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
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
