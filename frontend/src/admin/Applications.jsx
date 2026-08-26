import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobSeekers.css";

function Applications() {

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/applications"
      );

      if (res.data.success) {
        setApplications(res.data.applications);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const deleteApplication = async (id) => {

    if (!window.confirm("Delete this application?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/applications/${id}`
      );

      alert("Application deleted successfully");

      fetchApplications();

    } catch (error) {

      console.log(error);
      alert("Unable to delete application");

    }

  };

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="jobseekers-container">

      <h1>📄 Applications Management</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search Applicant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="jobseekers-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredApplications.length > 0 ? (

            filteredApplications.map((app) => (

              <tr key={app._id}>

                <td>{app.name}</td>

                <td>{app.email}</td>

                <td>
                  {app.jobId ? app.jobId.title : "N/A"}
                </td>

                <td>{app.status}</td>

                <td>

                  <a
                    href={`http://localhost:5000/uploads/${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>

                </td>

                <td>

                  <button
                    onClick={() => deleteApplication(app._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "7px 12px",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{ textAlign: "center" }}
              >
                No Applications Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );
}

export default Applications;