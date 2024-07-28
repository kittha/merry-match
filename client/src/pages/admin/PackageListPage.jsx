import Sidebar from "../../components/adminpackage/packagelist/Sidebar";
import Topbar from "../../components/adminpackage/packagelist/Topbar";
import MainContent from "../../components/adminpackage/packagelist/Maincontent";

function PackageListPage() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <MainContent />
      </div>
    </div>
  );
}

export default PackageListPage;
