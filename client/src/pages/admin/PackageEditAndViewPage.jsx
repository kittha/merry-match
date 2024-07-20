import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormPackage from "../../components/packageviewandedit/FormPackage";
import Sidebar from "../../components/packageviewandedit/Sidebar";
import Topbar from "../../components/packageviewandedit/Topbar";

function PackageEditAndViewPage() {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    package_id: "",
    name: "",
    price: "",
    merry_limit: "",
    details: [],
    created_at: "",
    updated_at: "",
    cloudinary_id: "",
    url: "",
    errors: {},
  });

  const validateForm = () => {
    const newErrors = {};
    if (!packageData.name.trim())
      newErrors.packageName = "Package name is required";
    if (!String(packageData.merry_limit).trim())
      newErrors.merryLimit = "Merry limit is required";
    if (!packageData.price.trim()) newErrors.price = "Price is required";
    if (!packageData.details.length)
      newErrors.packageDetail = "At least one package detail is required";
    setPackageData({ ...packageData, errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const editPackage = async () => {
    try {
      const sentAdminData = new FormData();
      sentAdminData.append("name", packageData.name);
      sentAdminData.append("price", packageData.price);
      sentAdminData.append("merry_limit", packageData.merry_limit);
      for (let index = 0; index < packageData.details.length; index++) {
        sentAdminData.append("details[]", packageData.details[index]);
      }
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/${
          packageData.package_id
        }`,
        sentAdminData
      );
      navigate("/admin/package");
    } catch (error) {
      console.error("Error create data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      editPackage();
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <Topbar />
          <FormPackage
            packageData={packageData}
            setPackageData={setPackageData}
          />
        </form>
      </div>
    </div>
  );
}
export default PackageEditAndViewPage;
