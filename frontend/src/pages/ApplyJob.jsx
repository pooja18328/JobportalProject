import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./ApplyJob.css";

const ApplyJob = () => {
  const { state } = useLocation();
  const job = state?.job;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !resume
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("jobId", job._id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("resume", resume);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/application/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setResume(null);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to submit application."
      );
    }
  };

  return (
    <section className="applyPage">
      <div className="applyContainer">
        <h2>Apply for {job?.title}</h2>

        <form onSubmit={handleApply}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value.replace(/\D/g, "").slice(0, 10)
              )
            }
            required
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>

          <div className="resumeUpload">
            <label>Upload Resume (PDF/Image)</label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          <button type="submit">
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplyJob;