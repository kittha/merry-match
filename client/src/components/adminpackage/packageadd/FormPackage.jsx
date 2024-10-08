import UploadIcon from "./Uploadicon";
import AddDetail from "./Adddetail";

function FormPackage({ packageData, setPackageData, icon, setIcon }) {
  const handleInputChange = (key, value) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: value,
      errors: { ...prevData.errors, [key]: "" },
    }));
  };

  return (
    <div className="bg-[#F6F7FC] w-full min-h-[1024px] pb-10 flex justify-center font-Nunito">
      <div className="w-[1080px] h-full pb-[60px] flex flex-col items-center gap-[40px] bg-[#FFFFFF] rounded-2xl border-1 mt-[40px] border-black ">
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
                  onChange={(event) =>
                    handleInputChange("name", event.target.value)
                  }
                />
              </div>
              {packageData.errors.name && (
                <p className="text-red-500">{packageData.errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="merry-limit">
                Merry limit <span className="text-[#AF2758]">*</span>
              </label>
              <div className="w-[420px] h-[48px]  border-[1px] border-[#D6D9E4] rounded-[8px] flex items-center ">
                <input
                  type="number"
                  min="0"
                  className="w-[420px] m-[12px] focus:outline-none"
                  id="merry-limit"
                  value={packageData.merry_limit}
                  name="merry-limit"
                  onChange={(event) =>
                    handleInputChange("merry_limit", event.target.value)
                  }
                />
              </div>
              {packageData.errors.merry_limit && (
                <p className="text-red-500">{packageData.errors.merry_limit}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="package-name">
              Price <span className="text-[#AF2758]">*</span>
            </label>
            <div className="w-[420px] h-[48px]  border-[1px] border-[#D6D9E4] rounded-[8px] flex items-center ">
              <input
                type="number"
                min="0"
                className="w-[420px] m-[12px] focus:outline-none"
                id="price"
                value={packageData.price}
                onChange={(event) =>
                  handleInputChange("price", event.target.value)
                }
              />
            </div>
            {packageData.errors.price && (
              <p className="text-red-500">{packageData.errors.price}</p>
            )}
          </div>
          <div className="flex flex-col gap-[8px]">
            <UploadIcon
              packageData={packageData}
              setPackageData={setPackageData}
              icon={icon}
              setIcon={setIcon}
            />
          </div>
          <div className="w-[880px] h-[1px] bg-[#E4E6ED]"></div>
          <div className="w-[880px] h-[30px] font-semibold text-[20px] text-[#646D89]">
            Package Detail
          </div>
          <AddDetail
            packageData={packageData}
            setPackageData={setPackageData}
            packageDetail={packageData.details}
            errors={packageData.errors.packageDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default FormPackage;
