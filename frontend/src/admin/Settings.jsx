import React from "react";
import "./JobSeekers.css";

function Settings() {
  return (
    <div className="jobseekers-container">

      <h1>⚙️ System Settings</h1>

      <table className="jobseekers-table">

        <thead>
          <tr>
            <th>Setting</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Application Name</td>
            <td>AI Job Portal</td>
          </tr>

          <tr>
            <td>Version</td>
            <td>1.0</td>
          </tr>

          <tr>
            <td>Database</td>
            <td>MongoDB</td>
          </tr>

          <tr>
            <td>Backend</td>
            <td>Node.js + Express</td>
          </tr>

          <tr>
            <td>Frontend</td>
            <td>React.js</td>
          </tr>

          <tr>
            <td>AI Modules</td>
            <td>Resume Analyzer, Interview Practice, ChatBot</td>
          </tr>

          <tr>
            <td>Status</td>
            <td>Running</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default Settings;