const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeCheckRoutes = require("./routes/resumeCheckRoutes");
const analyticsRoutes = require("./routes/analyticsRouter");

// 🛡️ Admin Routes
const adminRoutes = require("./routes/adminRoutes");

// 🤖 AI Interview Routes
const interviewRoutes = require("./routes/interviewRoutes");

// 🤖 ChatBot Routes
const chatbotRoutes = require("./routes/chatbotRoutes");

const path = require("path");

dotenv.config();

connectDB();

const app = express();

/* =====================================
              MIDDLEWARE
===================================== */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* =====================================
           STATIC FOLDER
===================================== */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =====================================
              ROUTES
===================================== */

// User Routes
app.use("/api/users", userRoutes);

// Employer Job Routes
app.use("/api/v1/job", jobRoutes);

// Job Application Routes
app.use("/api/v1/application", applicationRoutes);

// Resume Checker
app.use("/api/v1/resume", resumeCheckRoutes);

// Analytics
app.use("/api/v1/analytics", analyticsRoutes);

// 🛡️ Admin Routes
app.use("/api/admin", adminRoutes);

// AI Interview Practice
app.use("/api/v1/interview", interviewRoutes);

// AI ChatBot
app.use("/api/v1/chatbot", chatbotRoutes);

/* =====================================
            HOME ROUTE
===================================== */

app.get("/", (req, res) => {
  res.send("Job Portal Backend Running 🚀");
});

/* =====================================
             START SERVER
===================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});