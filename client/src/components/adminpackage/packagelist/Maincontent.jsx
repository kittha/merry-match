import { useNavigate } from "react-router-dom";
import drag from "../../../../public/assets/adminpackage/drag.svg";
import Delete from "../../../../public/assets/adminpackage/delete.svg";
import edit from "../../../../public/assets/adminpackage/edit.svg";
import DeletePackage from "./Deletepackage";
import { useState } from "react";

function MainContent({ Package, setpackage, deletePackage }) {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    hours = hours % 12 || 12; // Convert to 12-hour format

    const time = `${hours}:${minutes}${isPM ? "PM" : "AM"}`;

    const formattedDate = `${month}/${day}/${year} ${time}`;

    return formattedDate;
  };
  return (
    <div className="w-full min-h-[1024px] bg-[#F6F7FC] flex flex-col items-center font-Nunito">
      <div className="w-[1080px] h-[41px] flex bg-[#D6D9E4] mt-[48px] rounded-t-2xl font-medium text-sm text-[#424C6B]">
        <div className="w-[80px] h-[41px] flex items-center ml-[104px]">
          <p className="ml-[16px]">Icon</p>
        </div>
        <div className="w-[180px] h-[41px] flex items-center">
          <p className="ml-[16px]">Package name</p>
        </div>
        <div className="w-[180px] h-[41px] flex items-center">
          <p className="ml-[16px]">Merry limit</p>
        </div>
        <div className="w-[200px] h-[41px] flex items-center">
          <p className="ml-[16px]">Created date</p>
        </div>
        <div className="w-[317px] h-[41px] flex items-center">
          <p className="ml-[16px]">Updated date</p>
        </div>
      </div>
      {Package.map((items, index) => {
        const isLastIndex = index + 1 === Package.length;
        return (
          <div
            className={`w-[1080px] h-[88px] flex text-base bg-white font-normal ${
              isLastIndex ? "rounded-b-2xl" : ""
            }`}
            key={index}
          >
            <div className="w-[56px] h-[88px]">
              <img src={drag} alt="drag" />
            </div>
            <div className="w-[48px] h-[88px] flex justify-center items-center">
              {index + 1}
            </div>
            <div className="w-[80px] h-[88px] flex items-center">
              <img
                className="w-[32px] h-[32px] ml-[16px]"
                src={`${items.url}`}
                alt={`icon ${index}`}
              />
            </div>
            <div className="w-[180px] h-[88px] flex items-center">
              <p className="ml-[16px]">{items.name}</p>
            </div>
            <div className="w-[180px] h-[88px] flex items-center">
              <p className="ml-[16px]">{items.merry_limit} Merry</p>
            </div>
            <div className="w-[200px] h-[88px] flex items-center">
              <p className="ml-[16px]">{formatDate(items.created_at)}</p>
            </div>
            <div className="w-[216px] h-[88px] flex items-center">
              <p className="ml-[16px]">{formatDate(items.updated_at)}</p>
            </div>
            <div className="w-[120px] h-[88px] flex justify-center items-center gap-[17px]">
              <button onClick={() => setPopup(true)}>
                <img className="w-[24px] h-[24px]" src={Delete} alt="delete" />
              </button>
              <DeletePackage
                setpackage={setpackage}
                Package={Package}
                trigger={popup}
                setTrigger={setPopup}
                exit={items.package_id}
                index={index}
              ></DeletePackage>
              <button
                onClick={() => navigate(`/admin/package/${items.package_id}`)}
              >
                <img className="w-[24px] h-[24px]" src={edit} alt="edit" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MainContent;

{
  /* <button onClick={() => deletePackage(items.package_id, index)}></button> */
}
