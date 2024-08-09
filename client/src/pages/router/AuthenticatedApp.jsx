import HomePageAuthen from "../users/HomePageAuthen";
import NavbarAuthen from "../../components/navbar/NavbarAuthen";
import { Routes, Route } from "react-router-dom";
import UserProfilePage from "../users/UserProfilePage";
import PaymentPage from "../users/PaymentPage";
import PaymentSuccessPage from "../users/PaymentSuccessPage";
import { MembershipPage } from "../users/MembershipPage";
import MerryPackage from "../users/MerryPackagePage";
import { useAuth } from "../../contexts/authentication";
import PackageEditAndViewPage from "../admin/PackageEditAndViewPage";
import PackageListPage from "../admin/PackageListPage";
import PackageAddPage from "../admin/PackageAddPage";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import MatchingPage from "../users/MatchingPage";
import MerryListPage from "../users/MerryListPage";
import ComplaintPage from "../users/ComplaintPage";
import Chat from "../users/ChatPage";
// import MatchingArea from "../../components/matchingpage/matching-area/MatchingArea";
import ComplaintListPage from "../admin/ComplaintListPage";
import ComplaintDetailPage from "../admin/ComplaintDetailPage";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";

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
        <Route path="/merry-list" element={<MerryListPage />} />
        <Route path="/membership/:userId" element={<MembershipPage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/package" element={<MerryPackage />} />
        <Route path="/chat/:matchId" element={<Chat />} />
        <Route path="/chat" element={<ChatContainer />} />
        <Route path="*" element={<HomePageAuthen />} />
        {/* <Route path="/matchingArea" element={<MatchingArea />} /> */}

        {role === "Admin" && (
          <>
            <Route path="/admin/package" element={<PackageListPage />} />
            <Route path="/admin/package/add" element={<PackageAddPage />} />
            <Route
              path="/admin/package/:packageId"
              element={<PackageEditAndViewPage />}
            />
            <Route path="/admin/complaint" element={<ComplaintListPage />} />
            <Route
              path="/admin/complaint/:complaintId"
              element={<ComplaintDetailPage />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
