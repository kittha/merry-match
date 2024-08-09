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
import MatchingPage from "../users/MatchingPage";
import MerryListPage from "../users/MerryListPage";
import ComplaintPage from "../users/ComplaintPage";
import Chat from "../users/ChatPage";
import ComplaintListPage from "../admin/ComplaintListPage";
import ComplaintDetailPage from "../admin/ComplaintDetailPage";
import { ChatProvider } from "../../contexts/ChatProvider";
import { PackageProvider } from "../../contexts/PackageProvider";
import MatchingAndMerryWrapper from "../../components/wrapper/MatchingAndMerryWrapper";

const AuthenticatedApp = () => {
  const { state } = useAuth();
  const role = state.role;

  // Conditionally render the Navbar based on the role
  const renderNavbar = role !== "Admin" ? 
    <ChatProvider>
      <NavbarAuthen />
    </ChatProvider> : 
  null;

  return (
    <MatchingAndMerryWrapper>
    <div>
      {renderNavbar}
      <Routes>
        <Route path="/" element={<HomePageAuthen />} />
        <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="*" element={<HomePageAuthen />} />

        <Route 
          path="/chat/:matchId" 
          element={
              <ChatProvider>
                <Chat />
              </ChatProvider>
          } 
        />
        <Route 
          path="/matching" 
          element={
              <ChatProvider>
                <MatchingPage />
              </ChatProvider>
          } 
        />
          <Route 
          path="/membership/:userId" 
          element={
              <MembershipPage />
          } 
        />
        <Route 
          path="/merry-list" 
          element={
              <MerryListPage />
          } 
        />
        <Route 
          path="/package" 
          element={
          <PackageProvider>
            <MerryPackage />
          </PackageProvider>
        } 
        />
          <Route 
          path="/payment" 
          element={
            <PackageProvider>
                <PaymentPage />
            </PackageProvider>
          } 
        />
        <Route 
          path="/payment-success" 
          element={
            <PackageProvider>
               <PaymentSuccessPage />
            </PackageProvider>
            } 
            />

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
    </MatchingAndMerryWrapper>
  );
};

export default AuthenticatedApp;
