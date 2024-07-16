import HomePageAuthen from "../users/HomePageAuthen";
import NavbarAuthen from "../../components/navbar/NavbarAuthen";
import { Routes, Route } from "react-router-dom";
import UserProfilePage from "../users/UserProfilePage";

const AuthenticatedApp = () => {
  return (
    <div>
      <NavbarAuthen />
      <Routes>
        <Route path="/" element={<HomePageAuthen />} />
        <Route path="/user-profile/:userId" element={<UserProfilePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="*" element={<HomePageAuthen />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedApp;
