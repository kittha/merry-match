import React from "react";
import { deleteAccount } from "../../hooks/connectProfile.mjs";
import { useNavigate } from "react-router-dom";

const ModalPopup = ({ close }) => {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    deleteAccount(userId);
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 max-lg:px-[16px]">
      <div className="DeleteButton lg:w-[528px] w-full bg-white rounded-[24px] flex flex-col z-30 shadow-2xl ">
        <div className="flex flex-row justify-between items-center py-[8px] px-[16px] lg:px-[24px] border-b border-color-[#E4E6ED]">
          <h1 className="text-[1.25rem] font-[600] flex items-center">
            Delete Confirmation
          </h1>
          <button
            className="flex justify-center items-end text-[1.8rem] size-[40px] text-[#C8CCDB]"
            onClick={() => close(false)}
          >
            x
          </button>
        </div>
        <div className="p-[16px] lg:p-[24px] flex flex-col gap-[24px]">
          <p className="text-[1rem] font-[400] text-[#646D89]">
            Do you sure to delete account?
          </p>
          <div className="flex flex-col lg:flex-row gap-[16px]">
            <button
              onClick={handleDeleteAccount}
              className="bg-[#FFE1EA] drop-shadow-sm rounded-full py-[12px] px-[24px] text-[#95002B] font-[700]"
            >
              Yes, I want to delete
            </button>
            <button
              className="bg-[#C70039] drop-shadow-sm rounded-full py-[12px] px-[24px] text-white font-[700]"
              onClick={() => close(false)}
            >
              No, I don’t
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;
