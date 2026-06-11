import { Link, useNavigate } from "react-router-dom";
import "./EmployerNavbar.css";

function EmployerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="employer-navbar">

      <div className="logo">
        JobPortalPro
      </div>

      <div className="nav-links">

        <Link to="/employer/home">
          Home
        </Link>

        <Link to="/all-jobs">
          All Jobs
        </Link>

        {/* FIXED ROUTE */}
        <Link to="/my-applications">
          Applicant Applications
        </Link>

        <Link to="/post-job">
          Post New Job
        </Link>

        <Link to="/view-jobs">
          View Jobs
        </Link>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default EmployerNavbar;