import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Movies = lazy(() => import("../pages/Movies"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

// ── 404 fallback ──────────────────────────────────────────────────────────────
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "4rem" }}>
    <h1 style={{ fontSize: "3rem", color: "#6366f1" }}>404</h1>
    <p style={{ color: "#6b7280" }}>Page not found.</p>
  </div>
);

// ── Router definition ─────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // ── Always-public routes ──────────────────────────────────────────────────
      { path: "/", element: <Home /> },
      { path: "/movies", element: <Movies /> },

      // ── Auth routes (redirect to /dashboard if already logged in) ─────────
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },

      // ── Protected routes (redirect to /login if not authenticated) ────────
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },

      // ── 404 ──────────────────────────────────────────────────────────────
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// ── AppRouter component ────────────────────────────────────────────────────────
const AppRouter: React.FC = () => (
  <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default AppRouter;
