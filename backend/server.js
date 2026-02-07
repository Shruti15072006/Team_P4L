const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake database
let users = [];
let trackedData = [];

// ✅ LOGIN API
app.post("/api/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  users.push({ email, time: new Date() });

  res.json({
    success: true,
    message: "Login successful",
    email,
  });
});

// ✅ GET DASHBOARD DATA
app.get("/api/data", (req, res) => {
  res.json({
    success: true,
    totalUsers: users.length,
    trackedData,
  });
});

// ✅ TRACK FORM DATA
app.post("/api/track", (req, res) => {
  const data = {
    ...req.body,
    time: new Date(),
  };

  trackedData.push(data);

  res.json({
    success: true,
    message: "Data tracked successfully",
  });
});

// SERVER START
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
