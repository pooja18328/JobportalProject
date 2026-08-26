import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";
import loginImage from "../assets/login.avif";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    if (!formData.email || !formData.password) {
      showMessage("Please fill all fields", "error");
      return;
    }

    if (formData.password.length < 4) {
      showMessage("Password must be at least 4 characters", "error");
      return;
    }

    // ==========================
    // ADMIN LOGIN (Hardcoded)
    // ==========================
    if (formData.role === "Admin") {
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin123"
      ) {
        localStorage.setItem("role", "Admin");

        showMessage("Admin Login Successful!", "success");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1200);

        return;
      } else {
        showMessage("Invalid Admin Credentials", "error");
        return;
      }
    }

    // ==========================
    // Employer & Job Seeker Login
    // ==========================
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", formData.role);

      showMessage("Login successful!", "success");

      setTimeout(() => {
        if (formData.role === "Employer") {
          navigate("/employer/home");
        } else {
          navigate("/jobseeker/home");
        }
      }, 1200);
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Login failed",
        "error"
      );
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="authImageSection">
          <img src={loginImage} alt="Login" />

          <div className="overlayText">
            <h1>Welcome Back</h1>

            <p>
              Login to explore jobs, manage applications,
              and unlock career opportunities.
            </p>
          </div>
        </div>

        <div className="authFormSection">
          <h2>Login</h2>

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
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Admin">Admin</option>
              </select>
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
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primaryBtn">
              Login
            </button>

            <Link to="/register" className="secondaryBtn">
              Don’t have an account? Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;