import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PublicRouteProps {
  /** Redirect authenticated users here (default: "/dashboard") */
  redirectTo?: string;
}

/**
 * PublicRoute – renders child routes only when the user is NOT authenticated.
 * Redirects already-logged-in users to `redirectTo` to prevent accessing
 * the login/register pages while a session is active.
 *
 * Usage in your router:
 *   <Route element={<PublicRoute />}>
 *     <Route path="/login" element={<Login />} />
 *     <Route path="/register" element={<Register />} />
 *   </Route>
 */
const PublicRoute: React.FC<PublicRouteProps> = ({
  redirectTo = "/dashboard",
}) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
