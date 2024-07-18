import React from "react";
import success from "../../../public/assets/paymentSuccesspage/success.svg";
import icon from "../../../public/assets/paymentSuccesspage/icon.png";
import checkmark from "../../../public/assets/paymentSuccesspage/checkmark.svg";
import Footer from "../../components/homepage/Footer";
import { useNavigate } from "react-router-dom";
function PaymentSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className=" lg:pt-[88px] font-Nunito">
      <div className="flex justify-center">
        <div className="px-[16px] py-[40px] mt-[40px] lg:mt-[88px] mb-[88px] lg:mb-[361px] w-screen lg:w-[1112px] flex flex-col lg:flex-row gap-[40px] lg:gap-[114px]">
          <div className="left flex flex-col gap-[8px] lg:gap-[40px]">
            <img src={success} className="w-[80px] h-[80px]"></img>
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px] text-[#7B4429] font-[600]">
                PAYMENT SUCCESS
              </p>
              <p className="max-lg:w-[300px] text-[32px] leading-[40px] lg:text-[46px] font-[800] lg:leading-[57.5px] text-[#A62D82]">
                Welcome Merry Membership!
                <br />
                Thank you for joining us
              </p>
            </div>
            <div className="mt-[40px] flex gap-[24px] max-lg:hidden">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-[24px] py-[12px] bg-[#FFE1EA] text-[#95002B] font-[700] text-center rounded-full"
              >
                Back to home
              </button>
              <button
                onClick={() => {
                  navigate("/membership");
                }}
                className="px-[24px] py-[12px] bg-[#C70039] text-white font-[700] text-center rounded-full"
              >
                Check Membership
              </button>
            </div>
          </div>
          <div className="right">
            <div className="lg:w-[357px] p-[16px] lg:p-[40px] rounded-[32px] bg-gradient-to-r from-[#742138] to-[#A878BF] flex flex-col gap-[16px] lg:gap-[24px]">
              <img src={icon} className="w-[60px] h-[60px]"></img>
              <div className="top">
                <p className="text-white text-[32px] font-[700]">Premium</p>
                <span className="text-[#F4EBF2] text-[20px] font-[600]">
                  THB 149.00{" "}
                </span>
                <span className="text-[#F4EBF2] text-[16px] font-[400]">
                  /Month
                </span>
              </div>
              <div className="center  text-[#F4EBF2] font-[400] text-[16px] leading-[24px] flex flex-col gap-[16px] border-b border-[#E4E6ED] pb-[36px]">
                <div className="flex gap-[12px] items-center">
                  <img src={checkmark} className="w-[24px] h-[24px]"></img>
                  <span>‘Merry’ more than a daily limited</span>
                </div>
                <div className="flex gap-[12px] items-center">
                  <img src={checkmark} className="w-[24px] h-[24px]"></img>
                  <span>Up to 70 Merry per day</span>
                </div>
              </div>
              <div className="bottom ">
                <div className="flex justify-between py-[4px]">
                  <span className="text-[#EFC4E2] ">Start Membership</span>
                  <span className="text-white">01/04/2022</span>
                </div>
                <div className="flex justify-between py-[4px]">
                  <span className="text-[#EFC4E2] ">Next billing</span>
                  <span className="text-white ">01/05/2022</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[343px] h-[48px] flex justify-between gap-[16px] lg:hidden text-[16px]">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-[150px] h-[48px] px-[15px] py-[12px] bg-[#FFE1EA] text-[#95002B] font-[700]  rounded-full"
            >
              Back to home
            </button>
            <button
              onClick={() => {
                navigate("/membership");
              }}
              className="w-[177px] h-[48px] px-[15px] py-[12px] bg-[#C70039] text-white font-[700]  rounded-full"
            >
              Check Membership
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaymentSuccessPage;
