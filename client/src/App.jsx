import React from "react";
import UnauthenticatedApp from "./pages/router/UnauthenticatedApp";
import AuthenticatedApp from "./pages/router/AuthenticatedApp";
import { useAuth } from "./contexts/authentication";
import PaymentFormPage from "./pages/users/PaymentFormPage";
const App = () => {
  const auth = useAuth();

  return <PaymentFormPage />;
};


export default App;
