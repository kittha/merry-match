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

  const updateStatus = async (exit) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/admin/complaint/${exit}/status`,
        { status: "Pending" }
      );
      navigate(`/admin/complaint/${exit}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error update status", error);
    }
  };

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
    <div className="w-[1200px] min-h-[944px] pb-[48px] bg-[#F6F7FC] flex flex-col items-center font-Nunito">
      <div className="w-[1080px] h-[41px] flex bg-[#D6D9E4] mt-[48px] rounded-t-2xl font-medium text-sm text-[#424C6B]">
        <div className="w-[164px] h-[41px] flex items-center justify-center ">
          <p className="w-[84px] h-[21px]">User</p>
        </div>
        <div className="w-[200px] h-[41px] flex items-center justify-center">
          <p className="w-[168px] h-[21px]">Issue</p>
        </div>
        <div className="w-[420px] h-[41px] flex items-center justify-center">
          <p className="w-[388px] h-[21px]">Description</p>
        </div>
        <div className="w-[164px] h-[41px] flex items-center justify-center">
          <p className="w-[132px] h-[21px]">Date Submitted</p>
        </div>
        <div className="w-[132px] h-[41px] flex items-center justify-center">
          <p className="w-[100px] h-[21px]">Status</p>
        </div>
      </div>
      {complaint.map((items, index) => {
        const isLastIndex = index + 1 === complaint.length;
        return (
          <button
            key={index}
            onClick={() => {
              if (items.status === "New") {
                updateStatus(items.complaint_id);
              } else {
                navigate(`/admin/complaint/${items.complaint_id}`);
                window.scrollTo(0, 0);
              }
            }}
          >
            <div
              className={`w-[1080px] h-[90px] flex text-base border-b-[1px] border-[#F1F2F6] bg-white hover:bg-[#C70039] hover:text-white font-normal  ${
                isLastIndex ? "rounded-b-2xl" : ""
              }`}
              key={index}
            >
              <div className="w-[140px] h-[90px] flex items-center ml-6">
                <p className="w-[101px] h-[24px] flex items-center px-4 py-8 truncate ">
                  {items.username}
                </p>
                {items.username.length > 10 ? <p>...</p> : null}
              </div>
              <div className="w-[200px] h-[90px] flex items-center">
                <p className="w-[167px] h-[24px] flex items-center px-4 py-8 truncate">
                  {items.issue}
                </p>
                {items.issue.length > 19 ? <p>...</p> : null}
              </div>
              <div className="w-[420px] h-[90px] flex items-center">
                <p className="w-[388px] h-[24px] flex items-center px-4 py-8 truncate">
                  {items.description}
                </p>
                {items.description.length > 50 ? <p>...</p> : null}
              </div>
              <div className="w-[164px] h-[90px] flex items-center">
                <p className="w-[86px] h-[24px] flex items-center px-4 py-8">
                  {formatDate(items.created_at)}
                </p>
              </div>
              <div className="w-[108px] h-[90px] flex justify-center items-center  py-8 pl-4 pr-4">
                {items.status === "Pending" ? (
                  <div className="w-[65px] h-[26px] px-2.5 py-1 bg-[#FFF6D4] flex justify-center items-center rounded-[8px]">
                    <p className="text-xs text-[#393735]">{items.status}</p>
                  </div>
                ) : items.status === "New" ? (
                  <div className="w-[46px] h-[26px] px-2.5 py-1 bg-[#FAF1ED] flex justify-center items-center rounded-[8px]">
                    <p className="text-xs text-[#7B4429]">{items.status}</p>
                  </div>
                ) : items.status === "Resolved" ? (
                  <div className="w-[70px] h-[26px] px-2.5 py-1 bg-[#E7FFE7] flex justify-center items-center rounded-[8px]">
                    <p className="text-xs text-[#197418]">{items.status}</p>
                  </div>
                ) : (
                  <div className="w-[57px] h-[26px] px-2.5 py-1 bg-[#F1F2F6] flex justify-center items-center rounded-[8px]">
                    <p className="text-xs text-[#646D89]">{items.status}</p>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MainContent;
