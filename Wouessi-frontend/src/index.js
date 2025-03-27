import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import InternshipCertificate from "./pages/InternshipCertificate/InternshipCertificate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InternshipCertificate></InternshipCertificate>
  </React.StrictMode>
);
