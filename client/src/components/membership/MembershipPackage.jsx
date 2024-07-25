import React from "react";

import Pto from "../../../public/assets/matchingpage/matching-area/pto.jpg";
function MembershipPackage() {
  return (
    <div className="flex flex-col gap-[24px] w-full ">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px]">
        Merry Membership Package
      </h1>
      <div className="package-box  bg-gradient-to-r from-[#742138] to-[#A878BF] px-[32px] pt-[32px] pb-[24px] rounded-[32px] drop-shadow-lg">
        <div className="flex gap-[86px] pb-[40px] border-b border-[#DF89C6]">
          <div className="flex gap-[16px]">
            <div className="flex gap-[16px] w-[319px]">
              <img src={Pto} className="rounded-[16px] size-[78px]"></img>
              <div>
                <div className="mb-[8px] font-[700] text-[24px] text-[#FFFFFF]">
                  Premium
                </div>
                <span className="text-[#EFC4E2]">THB 149.00</span>
                <span className="text-[#EFC4E2]">/Month</span>
              </div>
            </div>
            <div className="flex flex-col text-[#F4EBF2] w-[357px]">
              <div>‘Merry’ more than a daily limited </div>
              <div>‘Merry’ more than a daily limited </div>
            </div>
          </div>
          <div className="status  bg-[#F3E4DD] w-[80px] h-[32px] py-[4px] px-[16px] font-[800] text-[16px] text-[#B8653E] rounded-full">
            Active
          </div>
        </div>
        <div className="flex justify-end mt-[16px]">
          <button className="px-[8px] py-[4px] font-[700] text-white">
            Cancel Package
          </button>
        </div>
      </div>
    </div>
  );
}

export default MembershipPackage;
