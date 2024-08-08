import { useState } from "react";
import Checkmark from "../../../public/assets/membershipPage/checkmark.svg";
import { addMonths, format } from "date-fns";
import Cancel from "../../../public/assets/membershipPage/cancel.svg";
function MembershipPackage({ details, history, onCancel }) {
  const [showPopup, setShowPopup] = useState(false);

  const lastBillingDate =
    history && history.length > 0
      ? new Date(Math.max(...history.map((item) => new Date(item.created_at))))
      : null;

  const nextBillingDate = lastBillingDate
    ? addMonths(lastBillingDate, 1)
    : null;

  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const handleConfirmCancel = () => {
    setShowPopup(false);
    onCancel();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col gap-[24px] max-lg:px-[16px]">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px]">
        Merry Membership Package
      </h1>
      <div className="package-box bg-gradient-to-r from-[#742138] to-[#A878BF] p-[16px] lg:p-[32px] rounded-[32px] drop-shadow-lg flex items-center justify-center">
        {!details ? (
          <p className="text-center text-[#FFFFFF] font-[600] text-[18px]">
            No package.
          </p>
        ) : (
          <div className="w-full">
            <div className="flex gap-[86px] pb-[40px] border-b border-[#DF89C6]">
              <div className="flex flex-col lg:flex-row gap-[16px]">
                <div className="flex flex-col lg:flex-row gap-[16px] w-full lg:w-[319px]">
                  <div className="bg-white rounded-[16px] size-[60px] lg:size-[78px] p-[16px] lg:p-[21px]">
                    <img
                      src={details.url}
                      className="lg:size-[36px] size-[28px]"
                      alt="Package"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="font-[700] text-[32px] text-[#FFFFFF]">
                      {details.name}
                    </div>
                    <div>
                      <span className="text-[#EFC4E2] text-[20px] font-[600]">
                        THB {details.price}
                      </span>
                      <span className="text-[#EFC4E2] text-[16px] font-[400]">
                        /Month
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-[16px] lg:gap-[8px] text-[#F4EBF2] w-full lg:w-[357px]">
                  {details.details.map((detail, index) => (
                    <div key={index} className="flex gap-[10px] items-center ">
                      <img
                        src={Checkmark}
                        className="size-[24px]"
                        alt="Checkmark"
                      />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F3E4DD] w-[80px] h-[32px] py-[4px] px-[16px] font-[800] text-[16px] text-[#B8653E] rounded-full max-lg:hidden">
                Active
              </div>
            </div>
            <div className="flex justify-center hover:drop-shadow-xl">
              <button
                className=" lg:hidden font-[700] text-white pt-[20px]"
                onClick={handleCancelClick}
              >
                Cancel Package
              </button>
            </div>
            <div className="flex justify-end mt-[16px] hover:drop-shadow-xl">
              <button
                className="px-[8px] py-[4px] font-[700] text-white max-lg:hidden"
                onClick={handleCancelClick}
              >
                Cancel Package
              </button>
            </div>
            <div className="flex flex-col justify-end mt-[16px] text-[#EFC4E2] font-[400] lg:hidden">
              <div className="flex justify-between">
                <p>Start Membership</p>
                <p>
                  {lastBillingDate
                    ? format(lastBillingDate, "dd/MM/yyyy")
                    : "N/A"}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Next billing</p>
                <p>
                  {nextBillingDate
                    ? format(nextBillingDate, "dd/MM/yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-[16px] w-[343px] lg:w-[528px] mx-4">
            <div className="flex items-center justify-between lg:px-[24px] py-[8px] px-[16px]  border-b border-[#E4E6ED]">
              <h2 className="text-[20px] font-[600]">Cancel Confirmation</h2>
              <div
                className="size-[40px] flex justify-center items-center hover:cursor-pointer "
                onClick={handleClosePopup}
              >
                <img src={Cancel} className="size-[10px]"></img>
              </div>
            </div>
            <div className="p-[16px] lg:p-[24px]">
              <p className="text-[#646D89] font-[400] ">
                Do you sure to cancel Membership to get more Merry?
              </p>
              <div className="flex flex-col lg:flex-row justify-center mt-[24px] gap-[16px]">
                <button
                  className="px-4 py-2 bg-[#FFE1EA] text-[#95002B] rounded-full font-[700] hover:drop-shadow-lg"
                  onClick={handleConfirmCancel}
                >
                  Yes, I want to cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#C70039] text-white rounded-full font-[700] hover:drop-shadow-lg"
                  onClick={handleClosePopup}
                >
                  No, I still want to be member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipPackage;
