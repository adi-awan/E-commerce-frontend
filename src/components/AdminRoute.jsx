import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;