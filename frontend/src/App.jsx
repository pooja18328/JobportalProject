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

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Employer Pages */}
        <Route path="/employer/home" element={<EmployerHome />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/view-jobs" element={<ViewJobs />} />
        <Route path="/all-jobs" element={<AllJobs />} />

        {/* Applicant Applications Page */}
        <Route
          path="/applicant-applications"
          element={<MyApplications />}
        />

        {/* Job Seeker Pages */}
        <Route path="/jobseeker/home" element={<JobSeekerHome />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/my-applications" element={<MyApplications />} />

      </Routes>
    </Router>
  );
}

export default App;