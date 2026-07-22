import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  /** Redirect unauthenticated users here (default: "/login") */
  redirectTo?: string;
}

/**
 * ProtectedRoute – renders child routes only when the user is authenticated.
 * Redirects to `redirectTo` otherwise.
 *
 * Usage in your router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/login",
}) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
