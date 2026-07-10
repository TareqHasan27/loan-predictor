import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { clearAuthData, getStoredUser } from "../utils/authStorage";

function AppLayout() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(getStoredUser());
    };

    window.addEventListener("auth-changed", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

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

        <div className="auth-status">
          {currentUser ? (
            <>
              <span className="user-badge">{currentUser.email}</span>
              <button type="button" className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="guest-badge">Guest</span>
          )}
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default AppLayout;