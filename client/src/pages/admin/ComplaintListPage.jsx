import Sidebar from "../../components/admincomplaint/complaintlist/Sidebar";
import Topbar from "../../components/admincomplaint/complaintlist/Topbar";
import MainContent from "../../components/admincomplaint/complaintlist/MainContent";

function ComplaintListPage() {
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

export default ComplaintListPage;
