const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve public folder for tracker.js and demo page
app.use(express.static(path.join(__dirname, "public")));

// Fake database
let users = [];
let trackedData = [];

// ============================
// 1️⃣ Health & Demo
// ============================
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "demo.html"));
});

app.get("/tracker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tracker.js"));
});

// ============================
// 2️⃣ Authentication & Setup
// ============================

// Register user
app.post("/api/auth/register", (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  const existingUser = users.find((u) => u.email === email);
  if (existingUser)
    return res.json({ success: true, dataPulseKey: existingUser.apiKey });

  const apiKey = Math.random().toString(36).substr(2, 10);
  users.push({ email, apiKey, createdAt: new Date() });

  res.json({ success: true, dataPulseKey: apiKey });
});

// Login user
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, dataPulseKey: user.apiKey });
});

// Get user's tracking key
app.get("/api/user/keys", (req, res) => {
  const email = req.query.email;
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, dataPulseKey: user.apiKey });
});

// ============================
// 3️⃣ Data Fetching for Dashboard
// ============================

// All submissions
app.get("/api/submissions", (req, res) => {
  const apiKey = req.query.apiKey;
  const userSubmissions = trackedData.filter((d) => d.apiKey === apiKey);
  res.json(userSubmissions);
});

// Stats
app.get("/api/submissions/stats", (req, res) => {
  const apiKey = req.query.apiKey;
  const userSubmissions = trackedData.filter((d) => d.apiKey === apiKey);
  const today = new Date().toDateString();

  const stats = {
    total: userSubmissions.length,
    today: userSubmissions.filter(
      (d) => new Date(d.timestamp).toDateString() === today,
    ).length,
    contactForms: userSubmissions.filter((d) => d.formData?.type === "contact")
      .length,
    responseRate: userSubmissions.length
      ? Math.floor(
          (userSubmissions.filter((d) => d.responded).length /
            userSubmissions.length) *
            100,
        )
      : 0,
  };

  res.json(stats);
});

// Recent submissions (last 5)
app.get("/api/subscriptions", (req, res) => {
  const apiKey = req.query.apiKey;
  const userSubmissions = trackedData
    .filter((d) => d.apiKey === apiKey)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  res.json(userSubmissions);
});

// ============================
// 4️⃣ Existing APIs
// ============================

// Login API (legacy)
app.post("/api/login", (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  users.push({ email, time: new Date() });
  res.json({ success: true, message: "Login successful", email });
});

// Dashboard data (legacy)
app.get("/api/data", (req, res) => {
  res.json({ success: true, totalUsers: users.length, trackedData });
});

// Track form data (legacy)
app.post("/api/track", (req, res) => {
  const data = { ...req.body, time: new Date() };
  trackedData.push(data);
  res.json({ success: true, message: "Data tracked successfully" });

  // Emit WebSocket update if apiKey exists
  if (data.apiKey && io) {
    io.to(data.apiKey).emit("newSubmission", data);
  }
});

// ============================
// 5️⃣ WebSocket Real-Time Updates
// ============================
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("join", (apiKey) => {
    socket.join(apiKey);
  });
});

// ============================
// 6️⃣ Collect Submission (new + real-time)
// ============================
app.post("/api/collect", (req, res) => {
  const { apiKey, formData, pageUrl, timestamp } = req.body;
  trackedData.push({ apiKey, formData, pageUrl, timestamp });

  if (apiKey && io) {
    io.to(apiKey).emit("newSubmission", {
      apiKey,
      formData,
      pageUrl,
      timestamp,
    });
  }

  res.json({ success: true });
});

// ============================
// 7️⃣ Start Server
// ============================
server.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`),
);
