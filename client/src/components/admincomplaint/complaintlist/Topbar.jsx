import FilterStatus from "./FilterStatus";
import SearchInput from "./Searchinput";

function Topbar({
  show,
  setShow,
  handleClick,
  getComplaint,
  searchText,
  setSearchText,
}) {
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <p className="text-2xl font-bold ml-16">Complaint list</p>
      <div className="flex gap-4">
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <FilterStatus
          show={show}
          setShow={setShow}
          handleClick={handleClick}
          getComplaint={getComplaint}
          searchText={searchText}
        />
      </div>
    </div>
  );
}

export default Topbar;
