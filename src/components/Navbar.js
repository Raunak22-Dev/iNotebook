import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
  <div className="container">
    <Link className="navbar-brand fw-bold text-primary fs-4" to="/" style={{ fontFamily: 'Roboto, sans-serif' }}>iNoteBook</Link>
    <button
      className="navbar-toggler border-0 shadow-sm"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "text-primary fw-bold" : "text-dark fw-normal"}`} to="/" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "text-primary fw-bold" : "text-dark fw-normal"}`} to="/about" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem' }}>
            About
          </Link>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        {!localStorage.getItem('token') ? (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login" role="button" style={{ borderRadius: '20px', fontFamily: 'Poppins, sans-serif' }}>Login</Link>
            <Link className="btn btn-primary text-white" to="/signup" role="button" style={{ borderRadius: '20px', fontFamily: 'Poppins, sans-serif' }}>Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-danger text-white shadow-sm"
            style={{ borderRadius: '20px', fontFamily: 'Poppins, sans-serif' }}>
            Logout
          </button>
        )}
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
