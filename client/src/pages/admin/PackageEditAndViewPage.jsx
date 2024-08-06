import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormPackage from "../../components/adminpackage/packageviewandedit/FormPackage";
import Sidebar from "../../components/adminpackage/packageviewandedit/Sidebar";
import Topbar from "../../components/adminpackage/packageviewandedit/Topbar";

function PackageEditAndViewPage() {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    package_id: "",
    name: "",
    price: "",
    merry_limit: "",
    details: [],
    errors: {},
    cloudinary_id: "",
    url: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!packageData.name.trim()) newErrors.name = "Package name is required";
    if (!String(packageData.merry_limit).trim())
      newErrors.merry_limit = "Merry limit is required";
    if (!packageData.price.trim()) newErrors.price = "Price is required";
    if (!packageData.details.length)
      newErrors.packageDetail = "At least one package detail is required";
    if (packageData.url === null) {
      newErrors.iconDetail = "At least one image is required";
    }
    setPackageData({ ...packageData, errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const editPackage = async () => {
    let result;
    const sentAdminData = new FormData();
    sentAdminData.append("name", packageData.name);
    sentAdminData.append("price", packageData.price);
    sentAdminData.append("merry_limit", packageData.merry_limit);
    sentAdminData.append("avatar", packageData.url);
    sentAdminData.append("id", packageData.cloudinary_id);
    for (let index = 0; index < packageData.details.length; index++) {
      sentAdminData.append("details[]", packageData.details[index]);
    }
    try {
      result = await axios.put(
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
      <div className="w-screen h-screen">
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
