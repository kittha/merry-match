import AgeRange from "./AgeRange";

function FilterContainer() {
  return (
    <div>
      <div className="w-full h-[146px] bg-black opacity-50 lg:hidden"></div>
      <div className="w-full h-[698px] flex flex-col  items-center lg:w-[220px] lg:h-[936px] font-Nunito bg-white z-10">
        <div className=" relative bottom-[32px] w-full h-[44px] flex rounded-t-[24px] justify-between items-center lg:hidden bg-white">
          <button className="ml-[16px]">X</button>
          <div>Filter</div>
          <button className="mr-[16px]">Clear</button>
        </div>
        <div className="w-screen h-[434px] flex flex-col gap-[40px] px-[17px]">
          <div className="flex flex-col h-[88px] gap-[16px]">
            <p>Search by Keywords</p>
            <div className="w-full h-[48px] flex items-center border-[#CCD0D7] border-[1px] rounded-md">
              <img
                className="w-[24px] h-[24px] ml-[16px]"
                src="./src/assets/search.svg"
                alt="search"
              />
              <input
                className="ml-[10px] w-[254px] h-[24px] focus:outline-none"
                type="text"
                id="text"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex flex-col h-[144px] gap-[16px]">
            <p>Sex you interest</p>
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="sex"
                  className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
                />
                <label className="ml-[12px]" htmlFor="checkbox1">
                  Default
                </label>
                <svg
                  className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="19 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox2"
                  name="sex"
                  className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
                />
                <label className="ml-[12px]" htmlFor="checkbox2">
                  Female
                </label>
                <svg
                  className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="19 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox3"
                  name="sex"
                  className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
                />
                <label className="ml-[12px]" htmlFor="checkbox3">
                  Non-bunary people
                </label>
                <svg
                  className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="19 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <AgeRange />
        </div>
      </div>
      <div className="flex w-full px-[17px] mb-[28px] justify-center">
        <button className="w-full h-[48px] bg-[#C70039] rounded-[99px] flex justify-center items-center ">
          <p className="text-white">Search</p>
        </button>
      </div>
    </div>
  );
}

export default FilterContainer;
