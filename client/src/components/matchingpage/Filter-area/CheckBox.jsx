function CheckBox() {
  return (
    <div className="flex flex-col gap-[16px] text-[#646D89] font-medium text-base ">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="checkbox1"
          name="sex"
          className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
        />
        <label
          className="ml-[12px] peer-checked:text-[#2A2E3F] "
          htmlFor="checkbox1"
        >
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
        <label
          className="ml-[12px] peer-checked:text-[#2A2E3F]"
          htmlFor="checkbox2"
        >
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
        <label
          className="ml-[12px] peer-checked:text-[#2A2E3F]"
          htmlFor="checkbox3"
        >
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
  );
}

export default CheckBox;
