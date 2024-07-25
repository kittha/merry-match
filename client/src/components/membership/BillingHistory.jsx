import React from "react";

function BillingHistory() {
  return (
    <div className="flex flex-col gap-[24px] ">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px]">Billing History</h1>
      <div className="billing-box px-[32px] pb-[24px] pt-[32px] border border-[#D6D9E4] rounded-[32px]">
        <h2 className="border-b border-[#E4E6ED] py-[8px] font-[600] text-[20px] text-gray-700">
          Next billing : 01/09/2022
        </h2>
        <div className="pb-[24px] border-b border-[#E4E6ED]">
          <div className="p-[16px] flex flex-col">
            <div className="flex flex-row gap-[16px] items-center">
              <div className="flex gap-[16px] font-[400] text-gray-700">
                <p className="date w-[104px]">01/08/2022</p>
                <p className="package-name w-[609px]">Premium</p>
              </div>
              <div className="price">
                <p className="w-[89px] font-[400] text-gray-800">THB 149.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-[16px]">
          <button className="text-[#C70039] font-[700] px-[8px] py-[4px]">
            Reqeust PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
