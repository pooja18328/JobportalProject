import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import registerImage from "../assets/register.avif";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      showMessage("Please select role", "error");
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      showMessage("Please fill all fields", "error");
      return;
    }

    if (formData.phone.length !== 10) {
      showMessage("Phone number must be exactly 10 digits", "error");
      return;
    }

    if (formData.password.length < 4) {
      showMessage("Password must be at least 4 characters", "error");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      showMessage("Registration successful!", "success");

      // Clear the form
      setFormData({
        role: "",
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      // Redirect to Login page after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      showMessage(
        error.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authImageSection">
          <img src={registerImage} alt="Register" />

          <div className="overlayText">
            <h1>Build Your Career</h1>

            <p>
              Join JobPortalPro today and connect with employers
              or talented professionals worldwide.
            </p>
          </div>
        </div>

        <div className="authFormSection">
          <h2>Create Account</h2>

          {message.text && (
            <div className={`customMessage ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>

            <div className="inputGroup">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </div>

            <div className="inputGroup">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primaryBtn">
              Register
            </button>

            <Link to="/login" className="secondaryBtn">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;