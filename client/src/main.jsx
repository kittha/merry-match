import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import jwtInterceptor from "./utils/jwtInterceptor.js";
import { AuthProvider } from "./contexts/authentication.jsx";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./contexts/FormProvider.jsx";

if (import.meta.env.VITE_NODE_ENV === "development") {
  // console.log("Running in development mode");
}
if (import.meta.env.VITE_NODE_ENV === "production") {
  // console.log("Running in production mode");
}

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <FormProvider>
            <App />
          </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
