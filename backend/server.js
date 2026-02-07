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

// ============================
// Fake database
// ============================
let users = [];
let trackedData = [];

// ============================
// Health check & demo
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
// Authentication
// ============================
app.post("/api/auth/register", (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  let user = users.find((u) => u.email === email);
  if (user) {
    return res.json({ success: true, dataPulseKey: user.apiKey });
  }

  const apiKey = Math.random().toString(36).substr(2, 10);
  user = { email, apiKey, createdAt: new Date() };
  users.push(user);

  res.json({ success: true, dataPulseKey: apiKey });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.json({ success: true, dataPulseKey: user.apiKey });
});

// ============================
// Track form submissions
// ============================
app.post("/api/track", (req, res) => {
  const { apiKey, page, data, time } = req.body;
  if (!apiKey)
    return res
      .status(400)
      .json({ success: false, message: "No API key provided" });

  const user = users.find((u) => u.apiKey === apiKey);
  if (!user)
    return res.status(400).json({ success: false, message: "Unknown user" });

  const tracked = {
    apiKey,
    userEmail: user.email,
    page: page || "unknown",
    data: data || {},
    timestamp: time || new Date().toISOString(),
  };

  trackedData.push(tracked);

  // Emit to WebSocket room
  io.to(apiKey).emit("newSubmission", tracked);

  res.json({ success: true, message: "Tracked successfully", data: tracked });
});

// ============================
// Fetch submissions (dashboard)
// ============================
app.get("/api/submissions", (req, res) => {
  const { apiKey } = req.query;
  const userSubmissions = trackedData.filter((d) => d.apiKey === apiKey);
  res.json(userSubmissions);
});

app.get("/api/submissions/stats", (req, res) => {
  const { apiKey } = req.query;
  const userSubmissions = trackedData.filter((d) => d.apiKey === apiKey);
  const today = new Date().toDateString();

  const stats = {
    total: userSubmissions.length,
    today: userSubmissions.filter(
      (d) => new Date(d.timestamp).toDateString() === today,
    ).length,
  };

  res.json(stats);
});

app.get("/api/submissions/recent", (req, res) => {
  const { apiKey } = req.query;
  const userSubmissions = trackedData
    .filter((d) => d.apiKey === apiKey)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  res.json(userSubmissions);
});

// ============================
// WebSocket setup
// ============================
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("WebSocket client connected");

  // Join room for real-time updates
  socket.on("join", (apiKey) => {
    socket.join(apiKey);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket client disconnected");
  });
});

// ============================
// Start server
// ============================
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
