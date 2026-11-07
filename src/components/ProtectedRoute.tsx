import { Navigate, Outlet } from "react-router-dom";

// Protects admin routes by requiring an authentication token.

export const ProtectedRoute = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
