import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authentication";
import logo from "../../../../public/assets/admincomplaint/logo.svg";
import Package from "../../../../public/assets/admincomplaint/package.svg";
import complaint from "../../../../public/assets/admincomplaint/complaint.svg";
import logoutimage from "../../../../public/assets/admincomplaint/logout.svg";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="font-Nunito w-[240px]  min-h-[1024px]  flex flex-col gap-[40px] items-center border-r-[1px] border-[#E4E6ED]">
      <div className="w-[240px] h-[135px]  flex flex-col justify-center items-center">
        <img src={logo} alt="logo" />
        <p className="text-base text-[#646D89]">Admin Panel Control</p>
      </div>
      <div className="w-[240px] h-[540px]">
        <button
          onClick={() => {
            navigate("/admin/package");
          }}
          className="w-full h-[72px] text-base font-extrabold text-[#424C6B] flex  items-center hover:bg-[#F1F2F6] "
        >
          <img className="ml-6" src={Package} alt="package" />
          <p className="ml-4">Merry Package</p>
        </button>
        <button className="w-full h-[72px] text-base font-extrabold text-[#424C6B] flex  items-center bg-[#F1F2F6] ">
          <img className="ml-6" src={complaint} alt="complaint" />
          <p className="ml-4">Complaint</p>
        </button>
      </div>
      <div className="w-[240px] h-[269px] ">
        <button
          onClick={handleLogout}
          className="w-full h-[72px] text-base font-extrabold text-[#424C6B] border-t-[1px] border-[#E4E6ED] flex items-center hover:bg-[#F1F2F6] "
        >
          <img className="ml-6" src={logoutimage} alt="logout" />
          <p className="ml-4">Log out</p>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
