import Sidebar from "../../components/admincomplaint/complaintdetail/Sidebar";
import Topbar from "../../components/admincomplaint/complaintdetail/Topbar";
import MainContent from "../../components/admincomplaint/complaintdetail/MainContent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle.mjs";

function ComplaintDetailPage() {
  const param = useParams();
  const [complaint, setComplaintById] = useState("");
  const { isOpen, toggle } = useToggle();

  const getComplaint = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/complaint/${
          param.complaintId
        }`
      );
      setComplaintById(result.data);
    } catch (error) {
      console.error("Error fetching package data", error);
    }
  };

  useEffect(() => {
    getComplaint();
  }, [isOpen]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar
          refresh={isOpen}
          setRefresh={toggle}
          complaintData={complaint}
        />
        <MainContent complaintData={complaint} />
      </div>
    </div>
  );
}

export default ComplaintDetailPage;
