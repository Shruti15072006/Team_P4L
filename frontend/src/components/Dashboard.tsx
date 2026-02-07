import React, { useState, useEffect } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  message?: string;
  time: string;
  page: string;
  date: string;
}

const Dashboard: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in pricing', time: '10:30 AM', page: '/contact', date: 'Today' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', message: 'Requesting demo', time: '10:15 AM', page: '/contact', date: 'Today' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newSubmission: Submission = {
        id: submissions.length + 1,
        name: 'New User',
        email: `user${Date.now()}@example.com`,
        message: 'Just submitted a form',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        page: '/contact',
        date: 'Just now'
      };
      setSubmissions(prev => [newSubmission, ...prev]);
      setIsRefreshing(false);
    }, 1000);
  };

  const trackingCode = `<script>
window.datapulseKey = '${apiKey}';
</script>
<script src="http://localhost:5000/tracker.js"></script>`;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">📊 DataPulse Dashboard</h1>
          <p className="text-muted">Real-time form tracking</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white rounded-pill px-3 py-2 shadow-sm">
            <span className="text-danger">●</span> LIVE • {submissions.length} submissions
          </div>
          <button onClick={handleRefresh} className="btn btn-primary">
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Tracking Code */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>📋 Your Tracking Code</h5>
              <div className="bg-dark text-light p-3 rounded mb-3">
                <pre style={{ fontSize: '12px' }}>{trackingCode}</pre>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(trackingCode);
                  alert('Code copied!');
                }}
                className="btn btn-success w-100 mb-2"
              >
                Copy Code
              </button>
              <a 
                href="http://localhost:5000/demo" 
                target="_blank"
                className="btn btn-outline-primary w-100"
              >
                Open Demo
              </a>
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>📨 Recent Submissions</h5>
                <button 
                  onClick={() => alert('Export coming soon!')}
                  className="btn btn-outline-secondary"
                >
                  Export
                </button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Time</th>
                      <th>Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id} className={sub.date === 'Just now' ? 'table-success' : ''}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: '32px', height: '32px' }}>
                              {sub.name.charAt(0)}
                            </div>
                            {sub.name}
                            {sub.date === 'Just now' && <span className="badge bg-success ms-2">NEW</span>}
                          </div>
                        </td>
                        <td>{sub.email}</td>
                        <td>{sub.time}</td>
                        <td><span className="badge bg-light text-dark">{sub.page}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;