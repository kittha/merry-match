function FilterStatus() {
  return (
    <div className="w-[200px] h-[48px] flex gap-2 rounded-lg border-[#D6D9E4] border-[1px] items-center justify-center">
      <p className="w-[144px] h-[24px] text-[#9AA1B9]">All status</p>
      <button className="w-[20px] h-[20px]">
        <img
          src="./src/assets-backup/adminpage/arrow_drop_down_black.svg"
          alt="drop_down"
        />
      </button>
    </div>
  );
}
export default FilterStatus;
