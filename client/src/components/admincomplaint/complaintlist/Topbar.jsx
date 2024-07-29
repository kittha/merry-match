import AddButton from "./Addbutton";
import SearchInput from "./Searchinput";

function Topbar() {
  return (
    <div className="w-full h-[80px] font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <p className="text-2xl font-bold ml-16">Complaint list</p>
      <div className="mr-14 flex">
        <SearchInput />
        <AddButton />
      </div>
    </div>
  );
}

export default Topbar;
