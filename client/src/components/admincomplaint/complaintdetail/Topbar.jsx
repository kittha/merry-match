import { useNavigate } from "react-router-dom";
import Resolved from "./Resolved";
import Cancel from "./Cancel";
import { useState } from "react";
import arrow from "../../../../public/assets/admincomplaint/arrow_back.svg";

function Topbar({ complaintData, refresh, setRefresh }) {
  const [cancel, setCancel] = useState(false);
  const [resolve, setResolve] = useState(false);
  const navigate = useNavigate();
  // console.log(typeof typeof complaintData.issue);
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <div className="w-[338px] h-[30px] ml-[60px] flex items-center gap-[16px]">
        <button onClick={() => navigate("/admin/complaint")} type="button">
          <img src={arrow} alt="arrow" />
        </button>
        {typeof complaintData.issue === "string" &&
        complaintData.issue.length < 20 ? (
          <div className="text-2xl font-bold w-fit h-[30px] flex items-center ">
            <p className="w-fit h-[30px] truncate">{complaintData.issue}</p>
          </div>
        ) : (
          <div className="text-2xl font-bold w-[257px] h-[30px] flex items-center ">
            <p className="w-[210px] h-[30px] truncate">{complaintData.issue}</p>
          </div>
        )}

        <div>
          {complaintData.status === "Pending" ? (
            <div className="w-[65px] h-[26px] px-2.5 py-1 bg-[#FFF6D4] flex justify-center items-center rounded-[8px]">
              <p className="text-xs text-[#393735]">{complaintData.status}</p>
            </div>
          ) : complaintData.status === "New" ? (
            <div className="w-[46px] h-[26px] px-2.5 py-1 bg-[#FAF1ED] flex justify-center items-center rounded-[8px]">
              <p className="text-xs text-[#7B4429]">{complaintData.status}</p>
            </div>
          ) : complaintData.status === "Resolved" ? (
            <div className="w-[70px] h-[26px] px-2.5 py-1 bg-[#E7FFE7] flex justify-center items-center rounded-[8px]">
              <p className="text-xs text-[#197418]">{complaintData.status}</p>
            </div>
          ) : (
            <div className="w-[57px] h-[26px] px-2.5 py-1 bg-[#F1F2F6] flex justify-center items-center rounded-[8px]">
              <p className="text-xs text-[#646D89]">{complaintData.status}</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-[351px] h-[48px] mr-[60px] flex items-center gap-[16px]">
        {complaintData.status === "Pending" ||
        complaintData.status === "New" ? (
          <>
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
            <Cancel
              refresh={refresh}
              setRefresh={setRefresh}
              status={complaintData.status}
              id={complaintData.complaint_id}
              trigger={cancel}
              setTrigger={setCancel}
            ></Cancel>
            <Resolved
              refresh={refresh}
              setRefresh={setRefresh}
              status={complaintData.status}
              id={complaintData.complaint_id}
              trigger={resolve}
              setTrigger={setResolve}
            ></Resolved>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Topbar;
