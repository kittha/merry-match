function Sidebar() {
  return (
    <div className="font-Nunito w-[240px] h-[1024px]  flex flex-col justify-evenly items-center border-r-[1px] border-[#E4E6ED]">
      <div className="w-full h-[13%]  flex flex-col justify-center items-center">
        <img src="./src/assets/logo.svg" alt="logo" />
        <p className="text-base text-[#646D89]">Admin Panel Control</p>
      </div>
      <div className="w-full h-[53%]">
        <div className="w-[full] h-[13%] text-base font-extrabold text-[#424C6B] flex  items-center hover:bg-[#F1F2F6] cursor-pointer">
          <img className="ml-6" src="./src/assets/package.svg" alt="package" />
          <p className="ml-4">Merry Package</p>
        </div>
        <div className="w-[full] h-[13%] text-base font-extrabold text-[#424C6B] flex  items-center hover:bg-[#F1F2F6] cursor-pointer">
          <img
            className="ml-6"
            src="./src/assets/complaint.svg"
            alt="complaint"
          />
          <p className="ml-4">Complaint</p>
        </div>
      </div>
      <div className="w-full h-[26%] ">
        <div className="w-full h-[27%] text-base font-extrabold text-[#424C6B] border-t-[1px] border-[#E4E6ED] flex items-center hover:bg-[#F1F2F6] cursor-pointer">
          <img className="ml-6" src="./src/assets/logout.svg" alt="logout" />
          <p className="ml-4">Log out</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
