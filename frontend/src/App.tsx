import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeKey = 'dp_' + Math.random().toString(36).substring(2, 15);
    setApiKey(fakeKey);
    setIsRegistered(true);
  };

  // If registered, show Dashboard
  if (isRegistered) {
    return <Dashboard apiKey={apiKey} />;
  }

  // Otherwise show login
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '60px', height: '60px'}}>
                    <span className="text-white fw-bold fs-4">DP</span>
                  </div>
                  <h2 className="fw-bold">DataPulse</h2>
                  <p className="text-muted">Track form submissions in real-time</p>
                </div>

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-lg w-100">
                    Start Tracking Free
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;