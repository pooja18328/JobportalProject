import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {

  const navigate = useNavigate();


  return (

    <button
      className="backButton"
      onClick={() => navigate("/dashboard")}
    >

      ← Back to Dashboard

    </button>

  );

};


export default BackButton;