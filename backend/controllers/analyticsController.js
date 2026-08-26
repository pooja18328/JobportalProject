const Job = require("../models/jobModel");
const Application = require("../models/Application");

exports.getAnalytics = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const accepted =
      await Application.countDocuments({
        status: "Accepted",
      });

    const rejected =
      await Application.countDocuments({
        status: "Rejected",
      });

    const pending =
      await Application.countDocuments({
        status: "Pending",
      });

    res.status(200).json({
      success: true,
      analytics: {
        totalJobs,
        totalApplications,
        accepted,
        rejected,
        pending,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};