import { useState } from "react";
import axios from "axios";
import FormPackage from "../../components/packageadd/FormPackage";
import Sidebar from "../../components/packageadd/Sidebar";
import Topbar from "../../components/packageadd/Topbar";

function PackageAddPage() {
  const [packageName, setPackageName] = useState("");
  const [packageDetail, setPackageDetail] = useState([]);
  const [merryLimit, setMerryLimit] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!packageName.trim()) newErrors.packageName = "Package name is required";
    if (!merryLimit.trim()) newErrors.merryLimit = "Merry limit is required";
    if (!packageDetail.length)
      newErrors.packageDetail = "At least one package detail is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPackage = async () => {
    try {
      const sentAdminData = new FormData();
      sentAdminData.append("name", packageName);
      sentAdminData.append("price", 600);
      sentAdminData.append("merry_limit", merryLimit);
      for (let index = 0; index < packageDetail.length; index++) {
        sentAdminData.append("packageDetail[]", packageDetail[index]);
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/packages`,
        sentAdminData
      );
    } catch (error) {
      console.error("Error create data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      createPackage();
      alert("submit");
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <Topbar />
          <FormPackage
            packageName={packageName}
            setPackageName={setPackageName}
            packageDetail={packageDetail}
            setPackageDetail={setPackageDetail}
            merryLimit={merryLimit}
            setMerryLimit={setMerryLimit}
            errors={errors}
          />
        </form>
      </div>
    </div>
  );
}
export default PackageAddPage;
