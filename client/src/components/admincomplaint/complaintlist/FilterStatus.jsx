import { useState } from "react";
import axios from "axios";
import drop_down from "../../../../public/assets/admincomplaint/arrow_drop_down_black.svg";

function FilterStatus({
  show,
  setShow,
  handleClick,
  getComplaint,
  searchText,
}) {
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
                onClick={() => getComplaint(searchText)}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>All status</li>
              </button>
              <button
                onClick={() => getComplaint(searchText, "New")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>New</li>
              </button>
              <button
                onClick={() => getComplaint(searchText, "Pending")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>Pending</li>
              </button>
              <button
                onClick={() => getComplaint(searchText, "Resolved")}
                className=" hover:bg-[#C70039] hover:text-white"
              >
                <li>Resolved</li>
              </button>
              <button
                onClick={() => getComplaint(searchText, "Cancel")}
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
