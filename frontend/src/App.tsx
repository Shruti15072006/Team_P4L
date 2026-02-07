import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    alert('Account created! Check browser console.');
    console.log('Registered with email:', email);
  };

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

                {!isRegistered ? (
                  <form onSubmit={handleSubmit}>
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
                ) : (
                  <div className="text-center">
                    <div className="mb-3">
                      <i className="bi bi-check-circle-fill text-success" style={{fontSize: '3rem'}}></i>
                    </div>
                    <h4>Success! 🎉</h4>
                    <p>Your tracking code is ready</p>
                    <button className="btn btn-success mt-3">
                      Copy Tracking Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;