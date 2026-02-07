import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login"; // adjust path if needed
import Dashboard from "./components/Dashboard"; // if you have a real Dashboard component

// Temporary inline Login component
const TempLogin = () => <div>Loading login... (Check console for errors)</div>;

// Temporary inline Dashboard component
const TempDashboard = () => (
  <div>Loading dashboard... (Check console for errors)</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
