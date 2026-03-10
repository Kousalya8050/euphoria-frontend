import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin_logged_in");

  if (!isLoggedIn) {
    return <Navigate to="/admin_login" />;
  }

  return children;
}