import type { ReactNode } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom"

/*
* Shared layout for site structure, navigation, 
* header actions, and responsive menu behavior.
*/

type LayoutProps = {
  headerActions?: ReactNode;
};

export const Layout = ({ headerActions }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            onClick={() => setIsMenuOpen(false)}
          >
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
            {headerActions}
          </nav>

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


      <footer
        style={{
          width: "100%",
          padding: "24px 16px",
          marginTop: "auto",
          borderTop: "1px solid #333",
          textAlign: "center",
          fontSize: "13px",
          color: "#999",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <a
            href="/tos"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Terms of Service
          </a>

          <span aria-hidden="true">•</span>

          <a
            href="mailto:cruxaralabs@gmail.com"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Contact Support
          </a>
        </div>

        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Cruxara. All rights reserved.
        </p>
      </footer>

    </div>

  );
};



