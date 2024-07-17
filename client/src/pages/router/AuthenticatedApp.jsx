import HomePageAuthen from "../users/HomePageAuthen";
import NavbarAuthen from "../../components/navbar/NavbarAuthen";
import { Routes, Route } from "react-router-dom";
import UserProfilePage from "../users/UserProfilePage";
import PaymentFormPage from "../users/PaymentFormPage";
import PaymentSuccessPage from "../users/PaymentSuccessPage";
import { MembershipPage } from "../users/MembershipPage";
import MerryPackage from "../users/MerryPackagePage";
import ComplaintPage from "../users/ComplaintPage";

const AuthenticatedApp = () => {
  return (
    <div>
      <NavbarAuthen />
      <Routes>
        <Route path="/" element={<HomePageAuthen />} />
        <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/payment" element={<PaymentFormPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/package" element={<MerryPackage />} />
        <Route path="/compliants/:userId" element={<ComplaintPage />} />
        <Route path="*" element={<HomePageAuthen />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
