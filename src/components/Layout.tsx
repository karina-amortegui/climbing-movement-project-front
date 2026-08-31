import { Link, Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>{" "}
          <Link to="/movements">Movements</Link>{" "}
          <Link to="/login">Admin Login</Link>{" "}
          <Link to="/admin/movements/new">Add Movement</Link>
          <button type="button" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};