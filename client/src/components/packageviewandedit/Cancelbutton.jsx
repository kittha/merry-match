import { useNavigate } from "react-router-dom";

function CancelButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      type="button"
      className="w-[98px] h-[48px] rounded-[99px] bg-[#FFE1EA] text-[#95002B] drop-shadow-PinkButton"
    >
      Cancel
    </button>
  );
}

export default CancelButton;
