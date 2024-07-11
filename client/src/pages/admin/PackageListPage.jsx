import Sidebar from "../../components/packagelist/Sidebar";
import Topbar from "../../components/packagelist/Topbar";
import MainContent from "../../components/packagelist/Maincontent";

function PackageListPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <MainContent />
      </div>
    </div>
  );
}

export default PackageListPage;
