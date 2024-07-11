function DeletePackage() {
  return (
    <div className="w-[528px] h-[200px] font-Nunito">
      <div className="w-[528px] h-[56px] rounded-t-[20px] border-[1px] border-[#E4E6ED] flex justify-between items-center">
        <p className="ml-[24px] font-semibold text-xl">Delete Confirmation</p>
        <div className="w-[41px] h-[40px] flex ">
          <button>
            <img src="./src/assets/Vector.svg" alt="cross" />
          </button>
        </div>
      </div>
      <div className="w-[528px] h-[144px] flex flex-col">
        <p className="text-base font-normal text-[#646D89] ml-[24px] mt-[24px]">
          Do you sure to delete this Package?
        </p>
        <div className="flex gap-4 ml-[24px] mt-[24px]">
          <button className="w-[199px] h-[48px] bg-[#FFE1EA] rounded-[99px] text-[#95002B] text-base drop-shadow-PinkButton">
            Yes, I want to delete
          </button>
          <button className="w-[167px] h-[48px] bg-[#C70039] rounded-[99px] text-white text-base drop-shadow-RedButton">
            No, I don’t want
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePackage;
