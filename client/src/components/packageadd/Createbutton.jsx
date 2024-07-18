import { useNavigate } from "react-router-dom";

function CreateButton() {
  const navigate = useNavigate();

  return (
    <button
      type="submit"
      className="w-[98px] h-[48px] rounded-[99px] ml-[16px] bg-[#C70039] text-white drop-shadow-RedButton"
    >
      Create
    </button>
  );
}

export default CreateButton;
