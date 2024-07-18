import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormPackage from "../../components/packageadd/FormPackage";
import Sidebar from "../../components/packageadd/Sidebar";
import Topbar from "../../components/packageadd/Topbar";

function PackageAddPage() {
  const [packageName, setPackageName] = useState("");
  const [packageDetail, setPackageDetail] = useState([]);
  const [merryLimit, setMerryLimit] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!packageName.trim()) newErrors.packageName = "Package name is required";
    if (!merryLimit.trim()) newErrors.merryLimit = "Merry limit is required";
    if (!price.trim()) newErrors.price = "price is required";
    if (!packageDetail.length)
      newErrors.packageDetail = "At least one package detail is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPackage = async () => {
    try {
      const sentAdminData = new FormData();
      sentAdminData.append("name", packageName);
      sentAdminData.append("price", price);
      sentAdminData.append("merry_limit", merryLimit);
      for (let index = 0; index < packageDetail.length; index++) {
        sentAdminData.append("details[]", packageDetail[index]);
      }
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/package`,
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
      navigate("/admin/package");
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
            price={price}
            setPrice={setPrice}
            errors={errors}
          />
        </form>
      </div>
    </div>
  );
}
export default PackageAddPage;
