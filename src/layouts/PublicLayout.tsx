import { Link, NavLink, useNavigate } from "react-router-dom"
import { Layout } from "./Layout";
import "./Layout.css";


/*
 * Handles authentication controls for public routes.
 * Shows Admin Login or authenticated admin actions,
 * Passes them to the shared Layout.
 */

export const PublicLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const headerActions = isLoggedIn
    ? (
      <div className="site-header__actions">
        <Link className="header-action-link" to="/admin/movements/new">
          Add Movement
        </Link>

        <button
          className="logout-button"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    )
    : (
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link nav-link--active" : "nav-link"
        }
        to="/login"
      >
        Admin Login
      </NavLink>
    );

  return <Layout headerActions={headerActions} />;
};
