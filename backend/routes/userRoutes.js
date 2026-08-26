const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { role, name, email, phone, password } = req.body;

    if (!role || !name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await sendEmail(
      email,
      "Welcome to JobPortalPro 🎉",
      `
      <h2>Welcome ${name}</h2>
      <p>Your account has been created successfully.</p>
      <p>Role : <b>${role}</b></p>
      `
    );

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const { role, email, password } = req.body;

    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// ================= JOB SEEKERS =================

router.get("/jobseekers", async (req, res) => {

  try {

    const users = await User.find(
      {
        role: "Job Seeker",
      },
      "-password"
    );

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

// ================= EMPLOYERS =================

router.get("/employers", async (req, res) => {

  try {

    const users = await User.find(
      {
        role: "Employer",
      },
      "-password"
    );

    res.json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;