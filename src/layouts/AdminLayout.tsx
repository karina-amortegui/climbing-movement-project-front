import { Link, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import "./Layout.css";

/*
 * Handles controls for protected admin routes.
 * Passes Add Movement and Logout actions to the shared Layout.
 */

export const AdminLayout = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const headerActions = (
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
  );

  return <Layout headerActions={headerActions} />;
};