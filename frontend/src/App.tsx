import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Temporary inline Login component
const TempLogin = () => (
  <div>Loading login... (Check console for errors)</div>
);

// Temporary inline Dashboard component  
const TempDashboard = () => (
  <div>Loading dashboard... (Check console for errors)</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TempLogin />} />
        <Route path="/dashboard" element={<TempDashboard />} />
        <Route path="/" element={<TempLogin />} />
      </Routes>
    </Router>
  );
}

export default App;