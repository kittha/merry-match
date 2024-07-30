import back from "/assets/matchingpage/left-arrow.png";

const BackBar = () => {
  return (
    <div className="navbar-chat lg:hidden h-12 bg-white py-3 px-2 flex flex-row gap-4">
      <img src={back} alt="arrow-left" className="h-6 w-6" onClick={null} />
      <p className="font-medium text-[#2A2E3F] font-Nunito">{"Daeny"}</p>
    </div>
  );
};

export default BackBar;
