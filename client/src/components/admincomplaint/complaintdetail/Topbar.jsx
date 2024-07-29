import { useNavigate } from "react-router-dom";
import Resolved from "./Resolved";
import Cancel from "./Cancel";
import { useState } from "react";

function Topbar({ complaintData }) {
  const [cancel, setCancel] = useState(false);
  const [resolve, setResolve] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-[1200px] h-[80px] font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <div className="w-[378px] h-[30px] flex items-center gap-[16px]">
        <button onClick={() => navigate("/admin/complaint")} type="button">
          <img src="../src/assets/arrow_back.svg" alt="arrow" />
        </button>
        <p className="text-2xl font-bold ">{complaintData.issue}</p>
        <div>
          {complaintData.status === "pending" ? (
            <div className="w-[65px] h-[26px]  bg-[#FFF6D4] flex justify-center items-center rounded-[8px]">
              <p className="text-xs ">{complaintData.status}</p>
            </div>
          ) : complaintData.status === "new" ? (
            <div className="w-[65px] h-[26px]  bg-[#FAF1ED] flex justify-center items-center rounded-[8px]">
              <p className="text-xs">{complaintData.status}</p>
            </div>
          ) : complaintData.status === "Resolved" ? (
            <div className="w-[65px] h-[26px]  bg-[#E7FFE7] flex justify-center items-center rounded-[8px]">
              <p className="text-xs">{complaintData.status}</p>
            </div>
          ) : (
            <div className="w-[65px] h-[26px]  bg-[#F1F2F6] flex justify-center items-center rounded-[8px]">
              <p className="text-xs">{complaintData.status}</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-[351px] h-[48px] flex items-center gap-[16px]">
        <button
          type="button"
          onClick={() => setCancel(true)}
          className="w-[147px] h-[32px] font-bold text-[#C70039]"
        >
          Cancel Complaint
        </button>
        <button
          type="button"
          onClick={() => setResolve(true)}
          className="w-[188px] h-[48px] rounded-[99px] bg-[#C70039] text-white drop-shadow-RedButton"
        >
          Resolve Complaint
        </button>
        <Cancel trigger={cancel} setTrigger={setCancel}></Cancel>
        <Resolved trigger={resolve} setTrigger={setResolve}></Resolved>
      </div>
    </div>
  );
}

export default Topbar;
