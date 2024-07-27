import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated } from "./Services/auth";

const ProtectedRoutes = () => {
  if (!IsAuthenticated()) {
    window.alert("You are not authenticated. Please sign in.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
