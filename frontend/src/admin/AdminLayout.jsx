import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminDashboard.css";

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>🛡️ Admin</h2>

        <ul>

          <Link
            to="/admin/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
              📊 Dashboard
            </li>
          </Link>

          <Link
            to="/admin/jobseekers"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/jobseekers" ? "active" : ""}>
              👥 Job Seekers
            </li>
          </Link>

          <Link
            to="/admin/employers"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/employers" ? "active" : ""}>
              🏢 Employers
            </li>
          </Link>

          <Link
            to="/admin/jobs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/jobs" ? "active" : ""}>
              💼 Jobs
            </li>
          </Link>

          <Link
            to="/admin/applications"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/applications" ? "active" : ""}>
              📄 Applications
            </li>
          </Link>

          <Link
            to="/admin/settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/settings" ? "active" : ""}>
              ⚙️ Settings
            </li>
          </Link>

          <Link
            to="/admin/logout"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={location.pathname === "/admin/logout" ? "active" : ""}>
              🚪 Logout
            </li>
          </Link>

        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;