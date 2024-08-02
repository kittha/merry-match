import { useState } from "react";
import axios from "axios";
import drop_down from "../../../../public/assets/admincomplaint/arrow_drop_down_black.svg";

function FilterStatus({ setComplaint, complaint }) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const getComplaint = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/complaints`
      );
      setComplaint(
        result.data.sort((a, b) => {
          return a.complaint_id - b.complaint_id;
        })
      );
      handleClick();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getComplaintByStatus = async (text) => {
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/admin/complaints/list?status=${text}`
      );
      setComplaint(
        result.data.sort((a, b) => {
          return a.complaint_id - b.complaint_id;
        })
      );
      handleClick();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="w-[200px] h-[48px]  rounded-lg border-[#D6D9E4] border-[1px] ">
        <button
          onClick={handleClick}
          className="w-[200px] h-[48px] flex items-center gap-2 pl-3"
        >
          <p className="w-[144px] h-[24px] flex text-[#9AA1B9]">All status</p>
          <img src={drop_down} alt="drop_down" />
        </button>
        {show ? (
          <div className="w-[200px] h-[120px] rounded-lg border-[#D6D9E4] border-[1px] bg-white z-10 absolute top-16">
            <ul className=" flex flex-col">
              <button
                onClick={() => getComplaint()}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>All status</li>
              </button>
              <button
                onClick={() => getComplaintByStatus("New")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>New</li>
              </button>
              <button
                onClick={() => getComplaintByStatus("Pending")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>Pending</li>
              </button>
              <button
                onClick={() => getComplaintByStatus("Resolved")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>Resolved</li>
              </button>
              <button
                onClick={() => getComplaintByStatus("Cancel")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>Cancel</li>
              </button>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
export default FilterStatus;
