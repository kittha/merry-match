import Sidebar from "../../components/admincomplaint/complaintdetail/Sidebar";
import Topbar from "../../components/admincomplaint/complaintdetail/Topbar";
import MainContent from "../../components/admincomplaint/complaintdetail/MainContent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ComplaintDetailPage() {
  const param = useParams();
  const [complaint, setComplaintById] = useState("");

  const getComplaint = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/api/v1/admin/complaint/${param.complaintId}`
      );
      setComplaintById(result.data);
    } catch (error) {
      console.error("Error fetching package data", error);
    }
  };

  console.log(complaint);

  useEffect(() => {
    getComplaint();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar complaintData={complaint} />
        <MainContent complaintData={complaint} />
      </div>
    </div>
  );
}

export default ComplaintDetailPage;
