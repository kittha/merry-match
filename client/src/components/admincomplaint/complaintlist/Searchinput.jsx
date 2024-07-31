function SearchInput({ searchText, setSearchText }) {
  return (
    <div className="w-[320px] h-[48px] flex items-center border-[#CCD0D7] border-[1px] rounded-md">
      <img
        className="w-[24px] h-[24px] ml-[16px]"
        src="./src/assets/search.svg"
        alt="search"
      />
      <input
        className="ml-[10px] w-[254px] h-[24px] focus:outline-none"
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        id="text"
        placeholder="Search..."
      />
    </div>
  );
}
export default SearchInput;
