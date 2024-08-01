import { useNavigate } from "react-router-dom";

function AddButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin/package/add")}
      type="button"
      className="w-[160px] h-[48px] ml-[16px] rounded-[99px] bg-[#C70039] text-white drop-shadow-RedButton"
    >
      + Add Package
    </button>
  );
}
export default AddButton;
