import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <img
              className="site-brand__logo"
              src="/images/cruxara-logo.png"
              alt=""
              aria-hidden="true"
            />
            <span className="site-brand__name"><span>CRUXARA</span></span>
          </Link>

          <nav
            className={
              isMenuOpen
                ? "site-navigation site-navigation--open"
                : "site-navigation"
            }
            aria-label="Main navigation"
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
              to="/movements"
              onClick={() => setIsMenuOpen(false)}
            >
              Movements
            </NavLink>

            {!isLoggedIn && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </NavLink>
            )}
          </nav>

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

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-toggle__line"></span>
            <span className="menu-toggle__line"></span>
            <span className="menu-toggle__line"></span>
          </button>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
};