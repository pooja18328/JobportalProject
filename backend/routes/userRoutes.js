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

    // SEND WELCOME EMAIL
    await sendEmail(
      email,
      "Welcome to JobPortalPro 🎉",
      `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2 style="color:#2563eb;">
          Welcome to JobPortalPro
        </h2>

        <p>Hello <b>${name}</b>,</p>

        <p>
          Thank you for registering with JobPortalPro.
        </p>

        <p>
          Your account has been created successfully as a
          <b>${role}</b>.
        </p>

        <p>
          You can now:
        </p>

        <ul>
          <li>Search and apply for jobs</li>
          <li>Track your applications</li>
          <li>Upload resumes</li>
          <li>Connect with employers</li>
        </ul>

        <br>

        <p>
          Best Regards,<br>
          <b>JobPortalPro Team</b>
        </p>
      </div>
      `
    );

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

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

module.exports = router;