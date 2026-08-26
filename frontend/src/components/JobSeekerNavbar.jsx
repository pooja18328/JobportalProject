import { Link, useNavigate } from "react-router-dom";
import "./JobSeekerNavbar.css";

function JobSeekerNavbar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <nav className="jobseeker-navbar">


      <div className="logo">
        JobPortalPro
      </div>



      <div className="nav-links">


        <Link to="/jobseeker/home">
          Home
        </Link>


        <Link to="/all-jobs">
          All Jobs
        </Link>


        <Link to="/my-applications">
          My Applications
        </Link>


        {/* AI Interview Practice */}
        <Link to="/ai-practice">
          AI Practice 
        </Link>


        <Link to="/help">
          Help
        </Link>



        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>



      </div>


    </nav>

  );

}


export default JobSeekerNavbar;