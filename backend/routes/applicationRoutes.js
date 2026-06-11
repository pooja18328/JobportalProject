const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

const multer = require("multer");
const path = require("path");

/* MULTER STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

/* APPLY FOR JOB */
router.post(
  "/apply",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { jobId, name, email, phone, address } = req.body;

      if (
        !jobId ||
        !name ||
        !email ||
        !phone ||
        !address ||
        !req.file
      ) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields!",
        });
      }

      const application = await Application.create({
        jobId,
        name,
        email,
        phone,
        address,
        resume: req.file.filename,
        resumeName: req.file.originalname,
      });

      return res.status(201).json({
        success: true,
        message: "Application submitted successfully!",
        application,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Failed to submit application.",
      });
    }
  }
);

/* GET ALL APPLICATIONS */
router.get("/all", async (req, res) => {
  try {
    const applications = await Application.find().populate("jobId");

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
});

/* UPDATE APPLICATION STATUS */
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("jobId");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ACCEPTED EMAIL
    if (status === "Accepted") {
      await sendEmail(
        application.email,
        "Application Accepted",
        `
        <h2>Congratulations ${application.name}!</h2>

        <p>
          Your application for
          <b>${application.jobId?.title || "this position"}</b>
          has been accepted.
        </p>

        <p>
          The employer may contact you shortly regarding the next steps.
        </p>

        <br/>

        <p>Best Regards,</p>
        <p>Job Portal Team</p>
        `
      );
    }

    // REJECTED EMAIL
    if (status === "Rejected") {
      await sendEmail(
        application.email,
        "Application Update",
        `
        <h2>Hello ${application.name}</h2>

        <p>
          Thank you for applying for
          <b>${application.jobId?.title || "this position"}</b>.
        </p>

        <p>
          After careful consideration, your application was not selected for this role.
        </p>

        <p>
          We encourage you to apply for future opportunities.
        </p>

        <br/>

        <p>Best Regards,</p>
        <p>Job Portal Team</p>
        `
      );
    }

    return res.status(200).json({
      success: true,
      message: `Application ${status} successfully and email sent.`,
      application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

module.exports = router;