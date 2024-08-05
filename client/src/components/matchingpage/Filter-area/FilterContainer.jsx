import { useState } from "react";
import AgeRange from "./AgeRange";
import CheckBox from "./CheckBox";

function FilterContainer({ onClose }) {
  const [filterData, setFilterData] = useState({
    checkMale: "",
    checkFemale: "",
    checkOther: "",
    searchAgeRangeNumberLeft: "",
    searchAgeRangeNumberRight: "",
  });

  console.log(filterData);

  return (
    <div className="lg:w-[220px] w-screen lg:h-screen h-[80vh] bg-white z-30 lg:overflow-hidden overflow-auto rounded-[24px]">
      <div className="w-screen h-[698px] flex flex-col  items-center lg:w-[220px] lg:h-[936px] font-Nunito  lg:pt-[124px] z-20">
        <div className="pt-[64px] relative bottom-[32px] w-full h-[44px] flex rounded-t-[24px] justify-between items-center lg:hidden bg-white">
          <button className="ml-[16px]" type="button" onClick={onClose}>
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
          {/* <div className="flex flex-col h-[88px] gap-[16px] lg:w-[188px] lg:h-[88px]">
              <p className="text-[#2A2E3F] font-bold text-base">
                Search by Hobby
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
                  value={filterData.searchText}
                  onChange={(event) =>
                    handleChange("searchText", event.target.value)
                  }
                />
              </div>
            </div> */}
          <div className="flex flex-col h-[144px] gap-[16px] lg:w-[188px] lg:h-[144px]">
            <p className="text-[#2A2E3F] font-bold text-base">
              Sex you interest
            </p>
            <CheckBox filterData={filterData} setfilterData={setFilterData} />
          </div>
          <AgeRange filterData={filterData} setfilterData={setFilterData} />
        </div>
        <div className="flex w-full px-[17px] mb-[28px] justify-center lg:w-[219px] lg:h-[80px] lg:items-center">
          <button
            className="mr-[16px] text-[#C70039] font-bold text-base max-lg:hidden"
            type="button"
          >
            Clear
          </button>
          <button
            className="w-full h-[48px] bg-[#C70039] rounded-[99px] flex justify-center items-center lg:w-[99px] lg:h-[48px]"
            type="submit"
          >
            <p className="text-white">Search</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterContainer;
