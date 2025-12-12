import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "../utils/auth";

const AdminRoute = () => {
  const location = useLocation();
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!auth.isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
