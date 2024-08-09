import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormPackage from "../../components/adminpackage/packageadd/FormPackage";
import Sidebar from "../../components/adminpackage/packageadd/Sidebar";
import Topbar from "../../components/adminpackage/packageadd/Topbar";

function PackageAddPage() {
  const navigate = useNavigate();
  const [icon, setIcon] = useState({});
  const [packageData, setPackageData] = useState({
    name: "",
    price: "",
    merry_limit: "",
    details: [],
    errors: {},
  });

  const validateForm = () => {
    const newErrors = {};
    if (!packageData.name.trim()) newErrors.name = "Package name is required";
    if (!String(packageData.merry_limit).trim())
      newErrors.merry_limit = "Merry limit is required";
    if (!packageData.price.trim()) newErrors.price = "Price is required";
    if (!packageData.details.length)
      newErrors.packageDetail = "At least one package detail is required";
    if (Object.keys(icon).length === 0)
      newErrors.iconDetail = "At least one image is required";
    setPackageData({ ...packageData, errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const createPackage = async () => {
    let result;
    const sentAdminData = new FormData();
    sentAdminData.append("name", packageData.name);
    sentAdminData.append("price", packageData.price);
    sentAdminData.append("merry_limit", packageData.merry_limit);
    sentAdminData.append("avatar", icon["image"]);
    for (let index = 0; index < packageData.details.length; index++) {
      sentAdminData.append("details[]", packageData.details[index]);
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/package`,
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
      createPackage();
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen h-screen">
        <form onSubmit={handleSubmit}>
          <Topbar />
          <FormPackage
            packageData={packageData}
            setPackageData={setPackageData}
            icon={icon}
            setIcon={setIcon}
          />
        </form>
      </div>
    </div>
  );
}
export default PackageAddPage;
