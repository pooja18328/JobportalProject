import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import EmployerHome from "./pages/EmployerHome";
import JobSeekerHome from "./pages/JobSeekerHome";

import PostJob from "./components/Job/PostJob";
import ViewJobs from "./components/Job/ViewJobs";

import AllJobs from "./pages/AllJobs";
import ApplyJob from "./pages/ApplyJob";

import MyApplications from "./pages/MyApplications";

import ChatBot from "./components/ChatBot";

// ✅ AI Interview Practice
import AIPractice from "./pages/AIPractice";

// ✅ AI Interview Questions
import Interview from "./pages/Interview";

// ================= ADMIN =================

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import JobSeekers from "./admin/JobSeekers";
import Employers from "./admin/Employers";
import Jobs from "./admin/Jobs";
import Applications from "./admin/Applications";
import Settings from "./admin/Settings";
import Logout from "./admin/Logout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ================= ADMIN ================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="jobseekers"
            element={<JobSeekers />}
          />

          <Route
            path="employers"
            element={<Employers />}
          />

          <Route
            path="jobs"
            element={<Jobs />}
          />

          <Route
            path="applications"
            element={<Applications />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="logout"
            element={<Logout />}
          />

        </Route>

        {/* ================= EMPLOYER ================= */}

        <Route
          path="/employer/home"
          element={<EmployerHome />}
        />

        <Route
          path="/post-job"
          element={<PostJob />}
        />

        <Route
          path="/view-jobs"
          element={<ViewJobs />}
        />

        <Route
          path="/all-jobs"
          element={<AllJobs />}
        />

        {/* ================= APPLICATIONS ================= */}

        <Route
          path="/applicant-applications"
          element={<MyApplications />}
        />

        {/* ================= JOB SEEKER ================= */}

        <Route
          path="/jobseeker/home"
          element={<JobSeekerHome />}
        />

        <Route
          path="/apply-job"
          element={<ApplyJob />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        {/* ================= AI PRACTICE ================= */}

        <Route
          path="/ai-practice"
          element={<AIPractice />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        {/* ================= CHATBOT ================= */}

        <Route
          path="/help"
          element={<ChatBot />}
        />

      </Routes>
    </Router>
  );
}

export default App;