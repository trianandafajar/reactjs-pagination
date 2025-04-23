import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bulma/css/bulma.css";
import axios from "axios";

// Axios global config
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// Render root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
