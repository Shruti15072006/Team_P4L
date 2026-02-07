const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// dummy API
app.get("/api/data", (req, res) => {
  res.json({
    success: true,
    data: [{ id: 1, name: "Test User", email: "test@mail.com" }],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
