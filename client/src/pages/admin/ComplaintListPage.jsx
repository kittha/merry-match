import Sidebar from "../../components/admincomplaint/complaintlist/Sidebar";
import Topbar from "../../components/admincomplaint/complaintlist/Topbar";
import MainContent from "../../components/admincomplaint/complaintlist/MainContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function ComplaintListPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [complaint, setComplaint] = useState([]);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  const getComplaint = async (text, status) => {
    if (status === undefined) {
      try {
        const result = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/admin/complaints/param?name=${text}&status=`
        );
        setComplaint(
          result.data.sort((a, b) => {
            return a.complaint_id - b.complaint_id;
          })
        );
        if (show === true) {
          setShow(!show);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    } else {
      try {
        const result = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/admin/complaints/param?name=${text}&status=${status}`
        );
        setComplaint(
          result.data.sort((a, b) => {
            return a.complaint_id - b.complaint_id;
          })
        );
        if (show === true) {
          setShow(!show);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    }
  };

  const updateStatus = async (exit) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/admin/complaint/${exit}/status`,
        { status: "Pending" }
      );
      navigate(`/admin/complaint/${exit}`);
      window.scrollTo(0, 0);
    } catch (error) {
      // console.error("Error update status", error);
    }
  };

  const debouncedGetComplaint = useCallback(debounce(getComplaint, 500), []);

  useEffect(() => {
    debouncedGetComplaint(searchText);
  }, [searchText, debouncedGetComplaint]);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-screen h-screen">
        <Topbar
          show={show}
          setShow={setShow}
          getComplaint={getComplaint}
          searchText={searchText}
          setSearchText={setSearchText}
          handleClick={handleClick}
        />
        <MainContent complaint={complaint} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default ComplaintListPage;
