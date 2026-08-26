import EmployerNavbar from "../components/EmployerNavbar";
import Analytics from "../components/Analytics";
import "./EmployerHome.css";
import { Link } from "react-router-dom";
import empImage from "../assets/emp.jpg";

function EmployerHome() {
  return (
    <>
      <EmployerNavbar />

      <div className="employer-home">

        {/* HERO SECTION */}
        <section className="hero-section">

          <div className="hero-left">

            <h1>
              Find the Best Talent for Your Company
            </h1>

            <p>
              Post jobs, manage applicants, review resumes,
              and hire top professionals easily through
              our smart recruitment platform.
            </p>

            <div className="employerButtons">

              <Link to="/post-job">
                <button>Post New Job</button>
              </Link>

              <Link to="/all-jobs">
                <button>All Jobs</button>
              </Link>

              <Link to="/view-jobs">
                <button>View My Jobs</button>
              </Link>

              <Link to="/applicant-applications">
                <button>Applicant Applications</button>
              </Link>

            </div>
          </div>

          <div className="hero-right">
            <img
              src={empImage}
              alt="Employer Dashboard"
            />
          </div>

        </section>

        {/* ANALYTICS SECTION */}
        <Analytics />

        {/* HOW IT WORKS */}
        <section className="how-it-works">

          <h2>How It Works</h2>

          <div className="steps-container">

            <div className="step-card">
              <h3>Create Account</h3>

              <p>
                Register as an employer and create
                your company profile.
              </p>
            </div>

            <div className="step-card">
              <h3>Post Jobs</h3>

              <p>
                Publish job openings and reach
                qualified candidates easily.
              </p>
            </div>

            <div className="step-card">
              <h3>Manage Applicants</h3>

              <p>
                Review resumes, accept or reject
                applications, and organize hiring.
              </p>
            </div>

            <div className="step-card">
              <h3>Hire Talent</h3>

              <p>
                Select the best professionals
                for your organization.
              </p>
            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default EmployerHome;