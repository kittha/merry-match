import { useNavigate } from "react-router-dom";
import CancelButton from "./Cancelbutton";
import EditButton from "./Editbutton";

function Topbar() {
  const navigate = useNavigate();
  return (
    <div className="w-[1200px] h-[80px] font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <div className="ml-16 flex">
        <button onClick={() => navigate("/")} type="button">
          <img src="../src/assets/arrow_back.svg" alt="arrow" />
        </button>
        <p className="text-2xl font-bold ml-[16px]">Edit ‘Premium’</p>
      </div>
      <div className="mr-14 flex">
        <CancelButton />
        <EditButton />
      </div>
    </div>
  );
}

export default Topbar;
