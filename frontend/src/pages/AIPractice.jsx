import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AIPractice.css";

function AIPractice() {
  const [email, setEmail] = useState("");

  const handlePractice = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    // ✅ Save email for Interview page
    localStorage.setItem("practiceEmail", email);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/interview/send",
        {
          email,
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="ai-practice-container">
      <h1>AI Interview Practice</h1>

      <p>Prepare yourself before your real interview</p>

      <div className="practice-box">
        <h3>Enter your registered email</h3>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handlePractice}>
          Start Practice
        </button>
      </div>
    </div>
  );
}

export default AIPractice;