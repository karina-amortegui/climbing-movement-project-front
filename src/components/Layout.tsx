import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {
  const navigate = useNavigate();
  useLocation();
  //isLoggedIn - checks whether the token currently exists
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="site-brand" to="/" aria-label="Climbing Movement home">
            <span className="site-brand__mark" aria-hidden="true">CM</span>
            <span className="site-brand__name"><span>CRUXARA</span></span>
          </Link>

          <nav className="site-navigation" aria-label="Main navigation" />
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
              to="/"
              end
            >
              Home
            </NavLink>

          <NavLink
            className={({ isActive }) =>
            isActive ? "nav-link nav-link--active" : "nav-link"
            }
              to="/movements"
            >
              Movements
            </NavLink>

          {!isLoggedIn && (
            <NavLink
              className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
              }
                to="/login"
              >
                Admin Login
              </NavLink>
          )}

          {isLoggedIn && (
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
          )}
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
};