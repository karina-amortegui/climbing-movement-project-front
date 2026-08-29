import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>{" "}
          <Link to="/movements">Movements</Link>{" "}
          <Link to="/login">Admin Login</Link>{" "}
          <Link to="/admin/movements/new">Add Movement</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};