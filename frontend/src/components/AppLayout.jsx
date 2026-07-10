import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="layout">
      <header className="navbar">
        <NavLink to="/" className="brand">
          Smart Loan Predictor
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/predict">Predict</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default AppLayout;