const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel");

// ✅ IMPORT AUTH MIDDLEWARE
const authMiddleware = require("../middleware/auth");

/* =========================
   POST JOB (FIXED)
========================= */
router.post("/post", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      country,
      location,
      category,
      skills,
      description,
    } = req.body;

    // validation
    if (
      !title ||
      !country ||
      !location ||
      !category ||
      !skills ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields!",
      });
    }

    // ✅ FIX: added postedBy from logged-in user
    const job = await Job.create({
      title,
      country,
      location,
      category,
      skills,
      description,
      postedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to post job.",
    });
  }
});

/* =========================
   GET ALL JOBS
========================= */
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load jobs.",
    });
  }
});

/* =========================
   UPDATE JOB
========================= */
router.put("/update/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update failed.",
    });
  }
});

/* =========================
   DELETE JOB
========================= */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Delete failed.",
    });
  }
});

module.exports = router;