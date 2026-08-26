import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobSeekers.css";

function JobSeekers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const fetchJobSeekers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/jobseekers"
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobseekers-container">

      <h1>👥 Job Seekers Management</h1>

      <input
        type="text"
        placeholder="Search by Name or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
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

          {filteredUsers.map((user) => (

            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default JobSeekers;