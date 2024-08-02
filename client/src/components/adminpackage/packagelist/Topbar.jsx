import AddButton from "../packagelist/Addbutton";
import SearchInput from "./Searchinput";

function Topbar({ setSearchText, searchText }) {
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <p className="text-2xl font-bold ml-16">Merry Package</p>
      <div className="mr-14 flex">
        <SearchInput setSearchText={setSearchText} searchText={searchText} />
        <AddButton />
      </div>
    </div>
  );
}

export default Topbar;
