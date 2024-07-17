import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeletePackage(props) {
  const navigate = useNavigate();
  const deletePackage = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/packages/${props.exit}`);
      navigate("/");
    } catch (error) {
      console.error("Error delete package data", error);
    }
  };

  return props.trigger ? (
    <div className="bg-slate-300 w-[100%] h-[100%] fixed flex items-center justify-center bottom-0 left-0">
      <div className="w-[528px] h-[200px] font-Nunito  ">
        <div className="w-[528px] h-[56px] bg-white rounded-t-[20px] border-[1px] border-[#E4E6ED] flex justify-between items-center">
          <p className="ml-[24px] font-semibold text-xl">Delete Confirmation</p>
          <div className="w-[41px] h-[40px] flex ">
            <button onClick={() => props.setTrigger(false)}>
              <img src="./src/assets/Vector.svg" alt="cross" />
            </button>
          </div>
        </div>
        <div className="w-[528px] h-[144px] bg-white flex flex-col rounded-b-[20px] border-[1px] border-[#E4E6ED]">
          <p className="text-base font-normal text-[#646D89] ml-[24px] mt-[24px]">
            Do you sure to delete this Package?
          </p>
          <div className="flex gap-4 ml-[24px] mt-[24px]">
            <button
              onClick={deletePackage}
              className="w-[199px] h-[48px] bg-[#FFE1EA] rounded-[99px] text-[#95002B] text-base drop-shadow-PinkButton"
            >
              Yes, I want to delete
            </button>
            <button
              onClick={() => props.setTrigger(false)}
              className="w-[167px] h-[48px] bg-[#C70039] rounded-[99px] text-white text-base drop-shadow-RedButton"
            >
              No, I don’t want
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePackage;
