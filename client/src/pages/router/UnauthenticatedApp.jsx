import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../users/HomePage";
import Navbar from "../../components/navbar/Navbar";
import LoginPage from "../auth/LoginPage";
import RegisterPage from "../auth/RegisterPage";

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default UnauthenticatedApp;
