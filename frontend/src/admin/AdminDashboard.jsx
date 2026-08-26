import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobSeekers: 0,
    totalEmployers: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Welcome, Admin 👋</h1>
        <p>AI Job Portal Management System</p>
      </div>

      <div className="cards">
        <div className="card">
          <h2>👥</h2>
          <h3>Total Job Seekers</h3>
          <p>{stats.totalJobSeekers}</p>
        </div>

        <div className="card">
          <h2>🏢</h2>
          <h3>Total Employers</h3>
          <p>{stats.totalEmployers}</p>
        </div>

        <div className="card">
          <h2>💼</h2>
          <h3>Total Jobs</h3>
          <p>{stats.totalJobs}</p>
        </div>

        <div className="card">
          <h2>📄</h2>
          <h3>Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
      </div>

      <div className="welcome-box">
        <h2>Dashboard Overview</h2>

        <p>
          Welcome to the Admin Dashboard. Here you can manage Job Seekers,
          Employers, Job Posts, and Applications.
        </p>
      </div>
    </>
  );
}

export default AdminDashboard;