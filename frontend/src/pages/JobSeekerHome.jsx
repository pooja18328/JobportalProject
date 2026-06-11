import JobSeekerNavbar from "../components/JobSeekerNavbar";
import { Link } from "react-router-dom";
import "./JobSeekerHome.css";

function JobSeekerHome() {
  return (
    <>
      <JobSeekerNavbar />

      <div className="jobseeker-home">
        <section className="hero-section">
          <div className="hero-left">
            <h1>Find Your Dream Job Today</h1>

            <p>
              Search jobs, apply instantly, upload resumes, and track your
              applications through our smart job portal.
            </p>

            <div className="jobSeekerButtons">
              <Link to="/all-jobs">
                <button>All Jobs</button>
              </Link>

              <Link to="/my-applications">
                <button>My Applications</button>
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <img src="/jobseeker-home.avif" alt="Job Seeker Dashboard" />
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>

          <div className="steps-container">
            <div className="step-card">
              <h3>Create Profile</h3>
              <p>Register and build your professional job seeker profile.</p>
            </div>

            <div className="step-card">
              <h3>Search Jobs</h3>
              <p>Explore jobs that match your skills and interests.</p>
            </div>

            <div className="step-card">
              <h3>Apply Easily</h3>
              <p>Submit applications and resumes quickly.</p>
            </div>

            <div className="step-card">
              <h3>Track Applications</h3>
              <p>Monitor your submitted job applications anytime.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default JobSeekerHome;