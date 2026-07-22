import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <Link to="/" className={styles.logo}>
        GetMovies
      </Link>

      <ul className={styles.links}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].join(" ")
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].join(" ")
            }
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].join(" ")
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>

      <div className={styles.actions}>
        {currentUser ? (
          <>
            <span className={styles.email}>{currentUser.email}</span>
            <button className={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
