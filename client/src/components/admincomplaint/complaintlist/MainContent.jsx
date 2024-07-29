import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const [complaint, setComplaint] = useState([]);
  const navigate = useNavigate();

  const getComplaint = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/complaints`
      );
      setComplaint(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(complaint);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    hours = hours % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${month}/${day}/${year} `;

    return formattedDate;
  };

  useEffect(() => {
    getComplaint();
  }, []);
  return (
    <div className="w-[1200px] min-h-[944px] bg-[#F6F7FC] flex flex-col items-center font-Nunito">
      <div className="w-[1080px] h-[41px] flex bg-[#D6D9E4] mt-[48px] rounded-t-2xl font-medium text-sm text-[#424C6B]">
        <div className="w-[164px] h-[41px] flex items-center ">
          <p className="ml-[40px]">User</p>
        </div>
        <div className="w-[200px] h-[41px] flex items-center">
          <p className="ml-[16px]">Issue</p>
        </div>
        <div className="w-[420px] h-[41px] flex items-center">
          <p className="ml-[16px]">Description</p>
        </div>
        <div className="w-[164px] h-[41px] flex items-center">
          <p className="ml-[16px]">Date Submitted</p>
        </div>
        <div className="w-[132px] h-[41px] flex items-center">
          <p className="ml-[16px]">Status</p>
        </div>
      </div>
      {complaint.map((items, index) => {
        const isLastIndex = index + 1 === complaint.length;
        return (
          <div
            className={`w-[1080px] h-[90px] flex text-base border-b-[1px] border-[#F1F2F6] bg-white font-normal  ${
              isLastIndex ? "rounded-b-2xl" : ""
            }`}
            key={index}
          >
            <div className="w-[140px] h-[90px] flex flex-wrap items-center ml-[24px]">
              <p className="ml-[16px] ">{items.username}</p>
            </div>
            <div className="w-[200px] h-[90px] flex  items-center">
              <p className="ml-[16px]">{items.issue}</p>
            </div>
            <div className="w-[420px] h-[90px] flex  items-center">
              <p className="ml-[16px]">{items.description}</p>
            </div>
            <div className="w-[164px] h-[90px] flex items-center">
              <p className="ml-[16px]">{formatDate(items.created_at)}</p>
            </div>
            <div className="w-[108px] h-[90px] flex justify-center items-center gap-[17px] ">
              {items.status === "pending" ? (
                <button
                  onClick={() =>
                    navigate(`/admin/complaint/${items.complaint_id}`)
                  }
                  className="w-[65px] h-[26px]  bg-[#FFF6D4] flex justify-center items-center rounded-[8px]"
                >
                  <p className="text-xs text-[#393735]">{items.status}</p>
                </button>
              ) : items.status === "new" ? (
                <button
                  onClick={() =>
                    navigate(`/admin/complaint/${items.complaint_id}`)
                  }
                  className="w-[65px] h-[26px]  bg-[#FAF1ED] flex justify-center items-center rounded-[8px]"
                >
                  <p className="text-xs text-[#7B4429]">{items.status}</p>
                </button>
              ) : items.status === "Resolved" ? (
                <button
                  onClick={() =>
                    navigate(`/admin/complaint/${items.complaint_id}`)
                  }
                  className="w-[65px] h-[26px]  bg-[#E7FFE7] flex justify-center items-center rounded-[8px]"
                >
                  <p className="text-xs text-[#197418]">{items.status}</p>
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/admin/complaint/${items.complaint_id}`)
                  }
                  className="w-[65px] h-[26px]  bg-[#F1F2F6] flex justify-center items-center rounded-[8px]"
                >
                  <p className="text-xs text-[#646D89]">{items.status}</p>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MainContent;
