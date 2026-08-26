import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobSeekers.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/jobs"
      );

      if (res.data.success) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/jobs/${id}`
      );

      alert("Job deleted successfully");

      fetchJobs();
    } catch (error) {
      console.log(error);
      alert("Unable to delete job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobseekers-container">

      <h1>💼 Jobs Management</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search Job Title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="jobseekers-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>

                <td>
                  <button
                    onClick={() => deleteJob(job._id)}
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "7px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Jobs Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Jobs;