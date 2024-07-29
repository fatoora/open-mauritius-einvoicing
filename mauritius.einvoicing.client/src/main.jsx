import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Toaster from "./pages/Toaster.jsx";
import Watermark from './pages/Watermark.jsx';
import w_logo from "../public/devbee_name_logo.png";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Watermark text="Powered by " imageUrl={w_logo} />
    <App />
    <Toaster />
  </React.StrictMode>
);
