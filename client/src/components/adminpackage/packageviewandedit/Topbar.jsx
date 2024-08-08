import { useNavigate } from "react-router-dom";
import CancelButton from "./Cancelbutton";
import EditButton from "./Editbutton";
import arrow from "../../../../public/assets/adminpackage/arrow_back.svg";

function Topbar() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <div className="ml-16 flex">
        <button onClick={() => navigate("/admin/package")} type="button">
          <img src={arrow} alt="arrow" />
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
