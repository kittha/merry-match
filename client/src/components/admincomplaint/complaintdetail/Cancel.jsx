import axios from "axios";
import cross from "../../../../public/assets/admincomplaint/Vector.svg";

function Cancel(props) {
  const updateStatus = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/complaint/${
          props.id
        }/status`,
        { status: "Cancel" }
      );
      props.setRefresh();
      props.setTrigger(false);
    } catch (error) {
      // console.error("Error update complaint status", error);
    }
  };
  return props.trigger ? (
    <>
      <div className="bg-black w-[100%] h-[100%] fixed flex items-center justify-center bottom-0 left-0 opacity-50 "></div>
      <div className="w-[528px] h-[200px] font-Nunito fixed z-10 top-1/3 left-1/3 ">
        <div className="w-[528px] h-[56px] bg-white rounded-t-[20px] border-[1px] border-[#E4E6ED] flex justify-between items-center">
          <p className="ml-[24px] font-semibold text-xl">Cancel Complaint</p>
          <div className="w-[41px] h-[40px] flex ">
            <button type="button" onClick={() => props.setTrigger(false)}>
              <img src={cross} alt="cross" />
            </button>
          </div>
        </div>
        <div className="w-[528px] h-[144px] bg-white flex flex-col rounded-b-[20px] border-[1px] border-[#E4E6ED] gap-6">
          <p className="text-base font-normal text-[#646D89] ml-[24px] mt-[24px]">
            Do you sure to cancel this conplaint?
          </p>
          <div className="flex gap-4 ml-[24px] ">
            <button
              type="button"
              onClick={updateStatus}
              className="w-[239px] h-[48px] bg-[#FFE1EA] rounded-[99px] text-[#95002B] text-base drop-shadow-PinkButton"
            >
              Yes, cancel this complaint
            </button>
            <button
              type="button"
              onClick={() => props.setTrigger(false)}
              className="w-[215px] h-[48px] bg-[#C70039] rounded-[99px] text-white text-base drop-shadow-RedButton"
            >
              No, give me more time
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
export default Cancel;
