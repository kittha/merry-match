import CancelButton from "./Cancelbutton";
import CreateButton from "./Createbutton";

function Topbar() {
  return (
    <div className="w-full h-[80px] py-4 px-9 font-Nunito border-b-[1px] border-[#E4E6ED] flex justify-between items-center">
      <p className="text-2xl font-bold ml-16">Add Package</p>
      <div className="mr-14 flex">
        <CancelButton />
        <CreateButton />
      </div>
    </div>
  );
}

export default Topbar;
