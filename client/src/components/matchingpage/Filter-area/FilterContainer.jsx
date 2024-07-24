import AgeRange from "./AgeRange";
import CheckBox from "./CheckBox";

function FilterContainer() {
  return (
    <div className="w-[217px] h-screen right-0 absolute bg-white z-20">
      <div className="w-screen h-[146px] bg-black opacity-50 lg:hidden"></div>
      <div className="w-screen h-[698px] flex flex-col  items-center lg:w-[220px] lg:h-[936px] font-Nunito  lg:pt-[124px] z-20">
        <div className="pt-[12px] relative bottom-[32px] w-full h-[44px] flex rounded-t-[24px] justify-between items-center lg:hidden bg-white">
          <button className="ml-[16px]">
            <img
              className="w-[13px] h-[13px]"
              src="./src/assets-backup/filter-area/Vector.svg"
              alt="cross"
            />
          </button>
          <p className="text-[#191C77] font-bold text-xl">Filter</p>
          <button className="mr-[16px] text-[#C70039] font-bold text-base">
            Clear
          </button>
        </div>
        <div className="w-screen h-[434px] flex flex-col gap-[40px] px-[17px] mb-[110px] lg:mb-[0] lg:px-[13px] lg:w-[217px] lg:h-[674px] lg:gap-[60px] ">
          <div className="flex flex-col h-[88px] gap-[16px] lg:w-[188px] lg:h-[88px]">
            <p className="text-[#2A2E3F] font-bold text-base">
              Search by Keywords
            </p>
            <div className="w-full h-[48px] lg:w-[188px] lg:h-[48px] flex items-center border-[#CCD0D7] border-[1px] rounded-md">
              <img
                className="w-[24px] h-[24px] ml-[16px]"
                src="./src/assets/search.svg"
                alt="search"
              />
              <input
                className="ml-[10px] w-[254px] h-[24px] focus:outline-none lg:w-[60px] lg:h-[24px]"
                type="text"
                id="text"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex flex-col h-[144px] gap-[16px] lg:w-[188px] lg:h-[144px]">
            <p className="text-[#2A2E3F] font-bold text-base">
              Sex you interest
            </p>
            <CheckBox />
          </div>
          <AgeRange />
        </div>
        <div className="flex w-full px-[17px] mb-[28px] justify-center lg:w-[219px] lg:h-[80px] lg:items-center">
          <button className="mr-[16px] text-[#C70039] font-bold text-base max-lg:hidden">
            Clear
          </button>
          <button className="w-full h-[48px] bg-[#C70039] rounded-[99px] flex justify-center items-center lg:w-[99px] lg:h-[48px]">
            <p className="text-white">Search</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterContainer;
