import back from "/assets/matchingpage/left-arrow.png";
import { useNavigate } from "react-router-dom";

const BackBar = ({ anotherUser }) => {
  const navigate = useNavigate();
  return (
    <div
      className="navbar-chat lg:hidden h-12 bg-white py-3 px-2 flex flex-row gap-4"
      onClick={() => {
        navigate("/chat");
      }}
    >
      <img src={back} alt="arrow-left" className="h-6 w-6" />
      <p className="font-medium text-[#2A2E3F] font-Nunito">
        {anotherUser.name}
      </p>
    </div>
  );
};

export default BackBar;
