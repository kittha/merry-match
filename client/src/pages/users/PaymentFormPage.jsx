import React from "react";
import MasterCard from "../../../public/assets/paymentpage/MasterCard.png";
import Visa from "../../../public/assets/paymentpage/Visa.png";
const PaymentFormPage = () => {
  return (
    <div className="w-screen">
      <div className="flex flex-row gap-[22px] w-[928px] justify-center">
        <div className="left w-[358px]">BOX</div>
        <div className="right w-[548px]">
          <header className="flex justify-between bg-[#F6F7FC]">
            <h1>Credit Card</h1>
            <div className="flex">
              <img src={Visa}></img>
              <img src={MasterCard}></img>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormPage;
