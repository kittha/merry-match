import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (import.meta.env.VITE_NODE_ENV === "development") {
  console.log("Running in development mode");
}
if (import.meta.env.VITE_NODE_ENV === "production") {
  console.log("Running in production mode");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
