import { useContext, useState } from "react";
import IdentitiesAndInterests from "../../components/registerpage/Interests";
import ProfilePictures from "../../components/registerpage/ProfilePictures";
import BasicInformation from "../../components/registerpage/Information";
import { FormContext } from "../../contexts/FormProvider";

const RegisterPage = () => {
  const { handleSubmit, handleNext, handleBack, step } =
    useContext(FormContext);

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-Nunito lg:bg-register-bg  flex flex-col items-center justify-center w-screen h-screen bg-no-repeat bg-cover">
        <div className="h-screen flex  flex-col lg:justify-center lg:items-center lg:flex-col w-screen lg:w-[930px] lg:h-[703px]">
          <div className="lg:mt-[400px] mt-[100px] px-[16px]">
            <header className="w-full flex flex-col  justify-start   lg:flex-row lg:justify-between">
              <div className="flex flex-col items-start justify-center ">
                <p className="text-[14px] text-[#7B4429] mb-1 font-[600]">
                  REGISTER
                </p>
                <h1 className="text-[32px] lg:text-[46px] text-[#A62D82] leading-[40px] lg:leading-[57.5px] font-[700] lg:font-[800] text-left">
                  Join us and start <br /> matching
                </h1>
              </div>
              <div className="flex flex-row justify-center items-end ">
                {step === 1 && (
                  <div className="mt-[37px] w-screen lg:w-[430px] lg:h-[80px] flex flex-row lg:justify-end justify-start gap-[8px] lg:gap-[12px] ">
                    {/* Step 1 */}
                    <div className="gap-[8px] p-[8px] lg:w-[246px] lg:h-[80px] border-[1px] border-[#A62D82] lg:rounded-3xl rounded-[16px] flex flex-row items-center justify-evenly">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px]  lg:text-[24px] text-[#A62D82] font-[800]">
                          1
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-[#646D89] text-[12px] font-[500]">
                          Step 1/3
                        </p>
                        <p className="text-[#A62D82] font-[800] text-[16px] leading-[24px]">
                          Basic Information
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          2
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          3
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-[37px] w-screen lg:w-[480px] lg:h-[80px] flex flex-row lg:justify-end  gap-[8px] lg:gap-[12px] ">
                    {/* Step 1 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          1
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className=" w-[242px] gap-[8px] p-[8px] lg:w-[288px] lg:h-[80px] border-[1px] border-[#A62D82] lg:rounded-3xl rounded-[16px] flex flex-row items-center justify-evenly ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px]  lg:text-[24px] text-[#A62D82] font-[800]">
                          2
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-[#646D89] text-[12px] font-[500]">
                          Step 2/3
                        </p>
                        <p className="text-[#A62D82] font-[800] text-[16px] leading-[24px]">
                          Identities and Interests
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center  ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          3
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-[37px] w-screen lg:w-[409px] lg:h-[80px] flex flex-row lg:justify-end justify-start gap-[8px] lg:gap-[12px] ">
                    {/* Step 1 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center  ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          1
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="w-[56px] h-[56px] lg:w-[80px] lg:h-[80px] border-[1px] border-[#E4E6ED] rounded-[16px] lg:rounded-3xl text-center text-[#C8CCDB] flex flex-col items-center justify-center  ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px] lg:text-[24px] text-[#9aa1b9] font-[800] text-center">
                          2
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-[215px] gap-[8px] p-[8px] lg:w-[246px] lg:h-[80px] border-[1px] border-[#A62D82] lg:rounded-3xl rounded-[16px] flex flex-row items-center justify-evenly ">
                      <div className="bg-[#F1F2F6] w-[40px] h-[40px] rounded-[12px] lg:w-[48px] lg:h-[48px] lg:rounded-2xl flex flex-col items-center justify-center">
                        <p className="text-[16px] leading-[24px]  lg:text-[24px] text-[#A62D82] font-[800]">
                          3
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-[#646D89] text-[12px] font-[500]">
                          Step 3/3
                        </p>
                        <p className="text-[#A62D82] font-[800] text-[16px] leading-[24px]">
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
            {step === 3 && <ProfilePictures />}
          </div>
          {/* Footer */}
          <div className="w-screen flex justify-center items-center border-t border-[#E4E6ED] bg-white">
            <div className="w-full">
              <div className="flex justify-between items-center py-[32px] px-[16px] lg:py-[32px] lg:px-[160px] bg-white">
                <p className="text-[#646D89] text-[16px] leading-[24px] font-[400]">
                  {step}
                  <span className="text-[#9AA1B9]">/3</span>
                </p>
                {/* Back button */}
                <div className="">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="text-[#C8CCDB] hover:text-[#C70039] font-[700]"
                  >
                    🡐 Back
                  </button>
                  {/* Next/Submit button */}
                  {step !== 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="drop-shadow-register text-[16px] leading-[24px] text-white bg-[#C70039] hover:bg-red-800 font-[700] rounded-[99px] px-[24px] py-[12px] text-center ml-[24px]"
                    >
                      Next step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="drop-shadow-register text-[16px] leading-[24px] text-white bg-[#C70039] hover:bg-red-800 font-[700] rounded-[99px] px-[24px] py-[12px] text-center ml-[24px]"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
