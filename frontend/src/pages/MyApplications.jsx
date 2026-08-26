
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const userRole = localStorage.getItem("role");

  // FETCH APPLICATIONS
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/application/all"
      );

      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status,
    rejectionReason = "",
    aiSuggestion = ""
  ) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/application/status/${id}`,
        {
          status,
          rejectionReason,
          aiSuggestion,
        }
      );

      toast.success(data.message);

      fetchApplications();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <section className="applicationsPage">
      <div className="applicationsContainer">
        <h2>
          {userRole === "Employer"
            ? "Applicant Applications"
            : "My Applications"}
        </h2>

        {applications.length === 0 ? (
          <p className="noApplications">
            No applications found.
          </p>
        ) : (
          applications.map((app) => (
            <div
              className="applicationCard"
              key={app._id}
            >
              <div className="applicationTop">
                <h3>
                  {app.jobId?.title || "Job Title"}
                </h3>

                <span
                  className={`statusBadge ${
                    app.status || "Pending"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </div>

              <div className="applicationDetails">
                <p>
                  <strong>Name:</strong> {app.name}
                </p>

                <p>
                  <strong>Email:</strong> {app.email}
                </p>

                <p>
                  <strong>Phone:</strong> {app.phone}
                </p>

                <p>
                  <strong>Address:</strong> {app.address}
                </p>

                {app.status === "Rejected" && (
                  <>
                    <p>
                      <strong>Reason:</strong>{" "}
                      {app.rejectionReason}
                    </p>

                    <p>
                      <strong>AI Suggestion:</strong>{" "}
                      {app.aiSuggestion}
                    </p>
                  </>
                )}
              </div>

              <div className="buttonGroup">
                {/* VIEW RESUME */}
                <a
                  href={`http://localhost:5000/uploads/${app.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="resumeBtn">
                    View Resume
                  </button>
                </a>

                {/* ONLY EMPLOYER */}
                {userRole === "Employer" && (
                  <>
                    <button
                      className="acceptBtn"
                      onClick={() =>
                        updateStatus(
                          app._id,
                          "Accepted"
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="rejectBtn"
                      onClick={() =>
                        updateStatus(
                          app._id,
                          "Rejected",
                          "Missing Required Skills or ",
                          "Recuritment process has been completed. Thank you for your interest."
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyApplications;

