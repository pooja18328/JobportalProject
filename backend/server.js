const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeCheckRoutes = require("./routes/resumeCheckRoutes");

const path = require("path");

dotenv.config();
connectDB();

const app = express();

/* Middleware */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* Static Folder for Resume Uploads */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/resume", resumeCheckRoutes);

/* Home Route */
app.get("/", (req, res) => {
  res.send("Job Portal Backend Running");
});

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});