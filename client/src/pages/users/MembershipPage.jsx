import React from "react";
import HeaderMembership from "../../components/membership/HeaderMembership";
import MembershipPackage from "../../components/membership/MembershipPackage";
import PaymentMethod from "../../components/membership/PaymentMethod";
import BillingHistory from "../../components/membership/BillingHistory";

export const MembershipPage = () => {
  return (
    <div className="flex justify-center pt-[168px] ">
      <div className="flex flex-col gap-[80px] items-center font-Nunito w-[930px]">
        <HeaderMembership />
        <div className="flex flex-col gap-[60px]">
          <MembershipPackage />
          <PaymentMethod />
          <BillingHistory />
        </div>
      </div>
    </div>
  );
};
