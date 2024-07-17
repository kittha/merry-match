import { useState, useEffect } from "react";

function AddDetail({ details, onDetailsChange }) {
  const [detail, setDetail] = useState("");
  const [packageDetail, setPackageDetail] = useState([...details]);

  useEffect(() => {
    setPackageDetail(details);
  }, [details]);

  const handleDetail = (event) => {
    setDetail(event.target.value);
  };

  const addDetail = () => {
    if (detail.trim()) {
      const newDetails = [...packageDetail, detail];
      setPackageDetail(newDetails);
      onDetailsChange(newDetails);
      setDetail("");
    }
  };

  const handleDetailChange = (index, event) => {
    const newDetails = [...packageDetail];
    newDetails[index] = event.target.value;
    setPackageDetail(newDetails);
    onDetailsChange(newDetails);
  };

  const deleteDetail = (index) => {
    const newDetails = [...packageDetail];
    newDetails.splice(index, 1);
    setPackageDetail(newDetails);
    onDetailsChange(newDetails);
  };

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        {packageDetail.map((item, index) => (
          <div
            key={index}
            className="flex gap-[24px] w-[880px] h-[76px] items-center"
          >
            <img
              className="w-[26px] h-[76px]"
              src="../src/assets/drag1.svg"
              alt="drag"
            />
            <div className="flex flex-col gap-[4px]">
              <label htmlFor={`package-detail-${index}`}>
                Detail <span className="text-[#AF2758]">*</span>
              </label>
              <div className="w-[740px] h-[48px] border-[1px] flex items-center justify-center border-[#D6D9E4] rounded-[8px]">
                <input
                  type="text"
                  id={`package-detail-${index}`}
                  value={item}
                  onChange={(event) => handleDetailChange(index, event)}
                  className="w-[712px] h-[24px] focus:outline-none"
                />
              </div>
            </div>
            <div className="w-[66px] h-[32px] flex justify-center items-center">
              <button
                type="button"
                className="text-base leading-[24px] font-bold text-[#C70039]"
                onClick={() => deleteDetail(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[240px] h-[48px] flex justify-center items-center">
        <button
          type="button"
          className=" text-[#95002B] bg-[#FFE1EA] w-[140px] h-[48px] rounded-full font-bold text-base drop-shadow-PinkButton"
        >
          + Add detail
        </button>
      </div>
    </>
  );
}

export default AddDetail;
