import Sidebar from "../../components/adminpackage/packagelist/Sidebar";
import Topbar from "../../components/adminpackage/packagelist/Topbar";
import MainContent from "../../components/adminpackage/packagelist/Maincontent";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function PackageListPage() {
  const [searchText, setSearchText] = useState("");
  const [Package, setpackage] = useState([]);

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

  const getPackage = async (text) => {
    const changeText = text.trim();
    try {
      const result = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/packages/param?name=${changeText}`
      );
      setpackage(
        result.data.data.sort((a, b) => {
          return a.package_id - b.package_id;
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePackage = async (id, index) => {
    try {
      const newPackage = [...Package];
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/${id}`
      );
      newPackage.splice(index, 1);
      setpackage(newPackage);
    } catch (error) {
      console.error("Error delete data:", error);
    }
  };

  const debouncedGetPackage = useCallback(debounce(getPackage, 500), []);

  useEffect(() => {
    debouncedGetPackage(searchText);
  }, [searchText, debouncedGetPackage]);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen h-screen  ">
        <Topbar setSearchText={setSearchText} searchText={searchText} />
        <MainContent
          setpackage={setpackage}
          Package={Package}
          deletePackage={deletePackage}
        />
      </div>
    </div>
  );
}

export default PackageListPage;
