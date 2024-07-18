import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormPackage from "../../components/packageadd/FormPackage";
import Sidebar from "../../components/packageadd/Sidebar";
import Topbar from "../../components/packageadd/Topbar";

function PackageAddPage() {
  const navigate = useNavigate();
  const image = "image";
  const [icon, setIcon] = useState({});
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
    if (!packageData.price.trim()) newErrors.price = "price is required";
    if (!packageData.details.length)
      newErrors.packageDetail = "At least one package detail is required";
    setPackageData({ ...packageData, errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const createPackage = async () => {
    try {
      const sentAdminData = new FormData();
      sentAdminData.append("name", packageData.name);
      sentAdminData.append("price", packageData.price);
      sentAdminData.append("merry_limit", packageData.merry_limit);
      sentAdminData.append("avatar", icon[image]);
      for (let index = 0; index < packageData.details.length; index++) {
        sentAdminData.append("details[]", packageData.details[index]);
      }

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
      <div className="flex flex-col">
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
