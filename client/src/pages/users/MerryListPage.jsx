import React from "react";
import { useMerryLimit } from "../../contexts/MerryLimitProvider";
//import { useState } from "react";
//import axios from "axios";
//import image from "/assets/complaint-image/image.png";
import Footer from "../../components/homepage/Footer";
//import { useAuth } from "../../contexts/authentication";

function MerryListPage() {
  const {
    availableClicksToday,
    setAvailableClicksToday,
    maxDailyQuota,
    setmaxDailyQuota,
  } = useMerryLimit;
  return (
    //   const { state } = useAuth();
    //   const userId = state && state.user ? state.user.id : null;
    //   const [issue, setIssue] = useState("");
    //   const [description, setDescription] = useState("");
    //   const postComplaintPage = async () => {
    //     try {
    //       const result = await axios.post(
    //         `${import.meta.env.VITE_BACKEND_URL}/api/v1/complaints/`,
    //         {
    //           issue: issue,
    //           description: description,
    //           userId: userId,
    //         }
    //       );
    //       console.log(result);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     postComplaintPage();
    //   };
    <div className="font-Nunito lg:w-full lg:h-full">
      <div className="w-[375px] h-[950px] flex flex-col gap-[40px] bg-[#FCFCFE] pt-[90px] lg:w-[1440px] lg:h-[2024px] min-[320px]:w-auto lg:gap-[80px] lg:pt-[160px] font-Nunito mx-auto">
        <div className="w-[343px] h-[532px] flex flex-col gap-[40px] mx-auto lg:w-[993px] lg:h-[1797px] lg:gap-[40px]">
          <div className="flex flex-col gap-[40px] lg:w-[933px] lg:h-[209px] lg:gap-[80px]">
            <header className="w-[343px] h-[149px] flex lg:flex-col lg:gap-[24px] lg:w-[933px] lg:h-[87px]">
              <p className="w-[343px] h-[21px] lg:w-[933px] lg:h-[21px] text-sm leading-6 text-[#7B4429] font-semibold">
                MERRY LIST
              </p>
              <h2 className="w-[343px] h-[120px] text-[32px] leading-[40px] text-[#A62D82] text-left font-bold lg:w-[933px] lg:h-[58px] lg:text-[46px] lg:leading-[57.5px] lg:font-extrabold">
                Let’s know each other <br className="lg:hidden" /> with Merry!
              </h2>
            </header>
            <div className="lg:w-[933px] lg:h-[98px] flex justify-between">
              <div className="lg:w-[416px] lg:h-[98px] lg:gap-[16px]"></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MerryListPage;
