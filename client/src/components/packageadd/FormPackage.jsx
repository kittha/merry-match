import UploadIcon from "./Uploadicon";
import AddDetail from "./Adddetail";

function FormPackage({
  packageName,
  setPackageName,
  packageDetail,
  setPackageDetail,
  merryLimit,
  setMerryLimit,
  price,
  setPrice,
  errors,
}) {
  return (
    <div className="gray bg-[#F6F7FC] w-full min-h-[1024px] flex justify-center font-Nunito">
      <div className="white w-[1080px] h-full pb-[60px] flex flex-col items-center gap-[40px] bg-[#FFFFFF] rounded-2xl border-1 mt-[40px] border-black ">
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
                  value={packageName}
                  onChange={(event) => setPackageName(event.target.value)}
                />
                {errors.packageName && (
                  <p className="text-red-500">{errors.packageName}</p>
                )}
              </div>
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
                  value={merryLimit}
                  name="merry-limit"
                  onChange={(event) => setMerryLimit(event.target.value)}
                />
                {errors.merryLimit && (
                  <p className="text-red-500">{errors.merryLimit}</p>
                )}
              </div>
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
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
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
            packageDetail={packageDetail}
            setPackageDetail={setPackageDetail}
            errors={errors.packageDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default FormPackage;
