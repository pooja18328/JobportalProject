const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/check",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { skills } = req.body;

      if (!req.file || !skills) {
        return res.status(400).json({
          success: false,
          message: "Resume and skills are required",
        });
      }

      console.log("File Path:", req.file.path);

      const dataBuffer = fs.readFileSync(req.file.path);

      console.log("Buffer Loaded:", dataBuffer.length);
      console.log("pdfParse Type:", typeof pdfParse);

      const pdfData = await pdfParse(dataBuffer);

      console.log("PDF Parsed Successfully");

      const resumeText = pdfData.text.toLowerCase();

      const requiredSkills = skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());

      let matchedSkills = 0;

      requiredSkills.forEach((skill) => {
        if (resumeText.includes(skill)) {
          matchedSkills++;
        }
      });

      const score = Math.round(
        (matchedSkills / requiredSkills.length) * 100
      );

      return res.status(200).json({
        success: true,
        score,
        matchedSkills,
        totalSkills: requiredSkills.length,
        eligible: score >= 85,
      });
    } catch (error) {
      console.log("Resume Check Error:", error);

      return res.status(500).json({
        success: false,
        message: "Resume check failed",
      });
    }
  }
);

module.exports = router;