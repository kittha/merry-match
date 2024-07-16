import { useState } from "react";
import FormPackage from "../../components/packageviewandedit/FormPackage";
import Sidebar from "../../components/packageviewandedit/Sidebar";
import Topbar from "../../components/packageviewandedit/Topbar";

function PackageEditAndViewPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("submit");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <Topbar />
          <FormPackage />
        </form>
      </div>
    </div>
  );
}
export default PackageEditAndViewPage;
