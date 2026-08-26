const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },

    address: {
      type: String,
      required: true,
    },

    // Resume File Path
    resume: {
      type: String,
      required: true,
    },

    // Original File Name
    resumeName: {
      type: String,
    },

    // Application Status
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    // Rejection Analysis
    rejectionReason: {
      type: String,
      default: "",
    },

    aiSuggestion: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);