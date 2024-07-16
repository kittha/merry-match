import axios from "axios";
import UploadIcon from "./Uploadicon";
import AddDetail from "./Adddetail";
import DeletePackage from "./Deletepackage";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function FormPackage() {
  const param = useParams();
  const [popup, setPopup] = useState(false);
  const [packageData, setPackageData] = useState({
    package_id: "",
    name: "",
    price: "",
    merry_limit: "",
    details: [],
    created_at: "",
    updated_at: "",
    cloudinary_id: "",
    url: "",
  });

  useEffect(() => {
    getPackage();
  }, []);

  const getPackage = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/api/v1/packages/${param.packageId}`
      );
      const newPackageData = { ...packageData };
      for (const key in packageData) {
        if (result.data.hasOwnProperty(key)) {
          newPackageData[key] = result.data[key];
        }
      }
      setPackageData(newPackageData);
    } catch (error) {
      console.error("Error fetching package data", error);
    }
  };

  const handleChange = (key, value) => {
    setPackageData({ ...packageData, [key]: value });
  };

  const handleDetailChange = (details) => {
    setPackageData({ ...packageData, details });
  };

  return (
    <div className="gray bg-[#F6F7FC] w-full min-h-[1024px] flex flex-col items-center font-Nunito">
      <div className="white w-[1080px] h-full pb-[60px]  flex flex-col items-center gap-[40px] bg-[#FFFFFF] rounded-2xl border-1 mt-[40px] border-black ">
        <div className="flex flex-col gap-[40px] mt-[40px]">
          <div className="flex gap-[40px]">
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="package-name">
                Package name <span className="text-[#AF2758]">*</span>
              </label>
              <div className="w-[420px] h-[48px]  border-[1px] border-[#D6D9E4] rounded-[8px] flex items-center ">
                <input
                  type="text"
                  className="m-[12px] focus:outline-none"
                  id="package-name"
                  value={packageData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="package-name">
                Merry limit <span className="text-[#AF2758]">*</span>
              </label>
              <div className="w-[420px] h-[48px]  border-[1px] border-[#D6D9E4] rounded-[8px] flex items-center ">
                <input
                  type="number"
                  min="0"
                  className="w-[420px] m-[12px] focus:outline-none"
                  id="package-name"
                  value={packageData.merry_limit}
                  onChange={(event) =>
                    handleChange("merry_limit", event.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <UploadIcon />
          </div>
          <div className="w-[880px] h-[1px] bg-[#E4E6ED]"></div>
          <div className="w-[880px] h-[30px] font-semibold text-[20px] text-[#646D89]">
            Package Detail
          </div>
          <AddDetail
            details={packageData.details}
            onDetailsChange={handleDetailChange}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPopup(true)}
        className="relative left-[480px] top-[22px] text-base font-bold text-[#95A1B2] "
      >
        Delete Package
      </button>
      <DeletePackage
        exit={param.packageId}
        trigger={popup}
        setTrigger={setPopup}
      ></DeletePackage>
    </div>
  );
}

export default FormPackage;