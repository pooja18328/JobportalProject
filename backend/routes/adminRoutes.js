const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Job = require("../models/jobModel");
const Application = require("../models/Application");

// ================= DASHBOARD =================

router.get("/dashboard", async (req, res) => {
  try {
    const totalJobSeekers = await User.countDocuments({
      role: "Job Seeker",
    });

    const totalEmployers = await User.countDocuments({
      role: "Employer",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      success: true,
      totalJobSeekers,
      totalEmployers,
      totalJobs,
      totalApplications,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// ================= GET ALL JOBS =================

router.get("/jobs", async (req, res) => {

  try {

    const jobs = await Job.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// ================= DELETE JOB =================

router.delete("/jobs/:id", async (req, res) => {

  try {

    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// ================= GET ALL APPLICATIONS =================

router.get("/applications", async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("jobId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// ================= DELETE APPLICATION =================

router.delete("/applications/:id", async (req, res) => {

  try {

    const application = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!application) {

      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;