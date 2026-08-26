import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/analytics"
      );

      setAnalytics(data.analytics);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analytics) return <h3>Loading Analytics...</h3>;

  return (
    <div className="analytics-container">
      <h2>Dashboard Analytics</h2>

      <div className="analytics-grid">
        <div className="card">
          <h3>Total Jobs</h3>
          <p>{analytics.totalJobs}</p>
        </div>

        <div className="card">
          <h3>Total Applications</h3>
          <p>{analytics.totalApplications}</p>
        </div>

        <div className="card">
          <h3>Accepted</h3>
          <p>{analytics.accepted}</p>
        </div>

        <div className="card">
          <h3>Rejected</h3>
          <p>{analytics.rejected}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{analytics.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;