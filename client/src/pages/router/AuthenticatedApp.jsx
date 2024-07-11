import React from "react";

import HomePageAuthen from '../users/HomePageAuthen';
import NavbarAuthen from '../../components/navbar/NavbarAuthen';

const AuthenticatedApp = () => {
  return (
    <div>
      <NavbarAuthen />
      <HomePageAuthen />
    </div>
  );
};

export default AuthenticatedApp;