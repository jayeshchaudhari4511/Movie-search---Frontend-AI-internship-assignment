import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./MainLayout.module.css";

/**
 * MainLayout – wraps all authenticated/public pages with the Navbar.
 * Uses <Outlet /> so nested React Router routes render their content here.
 */
const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
