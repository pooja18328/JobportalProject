import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobSeekers.css";

function Employers() {

  const [employers, setEmployers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/users/employers"
      );

      if (res.data.success) {
        setEmployers(res.data.users);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const filteredEmployers = employers.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobseekers-container">

      <h1>🏢 Employers Management</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search Employer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="jobseekers-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployers.length > 0 ? (

            filteredEmployers.map((emp) => (

              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No Employers Found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Employers;