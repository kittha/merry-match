import HomePageAuthen from "../users/HomePageAuthen";
import NavbarAuthen from "../../components/navbar/NavbarAuthen";
import { Routes, Route } from "react-router-dom";
import UserProfilePage from "../users/UserProfilePage";
import PaymentFormPage from "../users/PaymentFormPage";
import PaymentSuccessPage from "../users/PaymentSuccessPage";
import { MembershipPage } from "../users/MembershipPage";
import MerryPackage from "../users/MerryPackagePage";
import { useAuth } from "../../contexts/authentication";
import PackageEditAndViewPage from "../admin/PackageEditAndViewPage";
import PackageListPage from "../admin/PackageListPage";
import PackageAddPage from "../admin/PackageAddPage";
import MatchingArea from "../../components/matchingpage/matching-area/MatchingArea";

const AuthenticatedApp = () => {
  const { state } = useAuth();
  const role = state.role;

  // Conditionally render the Navbar based on the role
  const renderNavbar = role !== "Admin" ? <NavbarAuthen /> : null;

  return (
    <div>
      {renderNavbar}
      <Routes>
        <Route path="/" element={<HomePageAuthen />} />
        <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        <Route path="/payment" element={<PaymentFormPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/package" element={<MerryPackage />} />
        <Route path="*" element={<HomePageAuthen />} />
        <Route path="/matchingArea" element={<MatchingArea />} />

        {role === "Admin" && (
          <>
            <Route path="/admin/package" element={<PackageListPage />} />
            <Route path="/admin/package/add" element={<PackageAddPage />} />
            <Route
              path="/admin/package/:packageId"
              element={<PackageEditAndViewPage />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
