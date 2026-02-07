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
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Interested in pricing plans for enterprise', time: '10:30 AM', page: '/contact', date: 'Today' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', message: 'Requesting demo session next week', time: '10:15 AM', page: '/contact', date: 'Today' },
    { id: 3, name: 'Alex Johnson', email: 'alex@startup.io', message: 'Technical support needed for integration', time: '09:45 AM', page: '/support', date: 'Today' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveCount, setLiveCount] = useState(3);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh simulation (every 8 seconds)
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // 40% chance to add new submission
      if (Math.random() < 0.4) {
        const names = ['Sarah Wilson', 'Mike Brown', 'Emma Davis', 'Chris Lee', 'Lisa Taylor'];
        const pages = ['/contact', '/signup', '/newsletter', '/support', '/pricing'];
        const messages = [
          'Interested in your services',
          'Requesting more information',
          'Newsletter subscription',
          'Technical question',
          'Partnership inquiry'
        ];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const newSubmission: Submission = {
          id: submissions.length + 1,
          name: randomName,
          email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
          message: messages[Math.floor(Math.random() * messages.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          page: pages[Math.floor(Math.random() * pages.length)],
          date: 'Just now'
        };
        
        setSubmissions(prev => [newSubmission, ...prev.slice(0, 9)]); // Keep max 10
        setLiveCount(prev => prev + 1);
        
        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('📨 New Form Submission', {
            body: `${randomName} submitted a form`,
            icon: '/favicon.ico'
          });
        }
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, submissions.length]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      const names = ['New Lead', 'Website Visitor', 'Prospective Client'];
      const newSubmission: Submission = {
        id: submissions.length + 1,
        name: names[Math.floor(Math.random() * names.length)],
        email: `lead${Date.now()}@company.com`,
        message: 'Submitted contact form on website',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        page: '/contact',
        date: 'Just now'
      };
      setSubmissions(prev => [newSubmission, ...prev]);
      setLiveCount(prev => prev + 1);
      setIsRefreshing(false);
    }, 800);
  };

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Message', 'Time', 'Page', 'Date'];
    const csvData = submissions.map(s => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.message || ''}"`,
      `"${s.time}"`,
      `"${s.page}"`,
      `"${s.date}"`
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `datapulse-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`✅ Exported ${submissions.length} submissions to CSV!`);
  };

  const trackingCode = `<script>
window.datapulseKey = '${apiKey}';
</script>
<script src="http://localhost:5000/tracker.js"></script>`;

  // Stats calculations
  const todaySubmissions = submissions.filter(s => s.date === 'Today' || s.date === 'Just now').length;
  const contactPageSubmissions = submissions.filter(s => s.page === '/contact').length;

  return (
    <div className="p-3 p-md-4 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="h2 fw-bold text-primary">
            <span className="text-dark">Data</span>Pulse Dashboard
          </h1>
          <p className="text-muted mb-0">Real-time form submission tracking</p>
        </div>
        
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="bg-white rounded-pill px-3 py-2 shadow-sm d-flex align-items-center">
            <span className="text-danger me-2" style={{ animation: 'pulse 2s infinite' }}>●</span>
            <span className="fw-semibold">{liveCount} LIVE</span>
          </div>
          
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="autoRefreshToggle" 
              checked={autoRefresh}
              onChange={() => setAutoRefresh(!autoRefresh)}
            />
            <label className="form-check-label small" htmlFor="autoRefreshToggle">
              Auto-refresh
            </label>
          </div>
          
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn btn-primary d-flex align-items-center"
          >
            <span className={isRefreshing ? 'spinner-border spinner-border-sm me-2' : 'd-none'}></span>
            {isRefreshing ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-primary bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '48px', height: '48px'}}>
                  <span style={{fontSize: '1.5rem'}}>{submissions.length}</span>
                </div>
                <div>
                  <div className="text-muted small">Total Submissions</div>
                  <div className="h4 fw-bold mb-0">{submissions.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-success bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '48px', height: '48px'}}>
                  <span style={{fontSize: '1.5rem'}}>{todaySubmissions}</span>
                </div>
                <div>
                  <div className="text-muted small">Today</div>
                  <div className="h4 fw-bold mb-0">{todaySubmissions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-warning bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '48px', height: '48px'}}>
                  <span style={{fontSize: '1.5rem'}}>{contactPageSubmissions}</span>
                </div>
                <div>
                  <div className="text-muted small">Contact Forms</div>
                  <div className="h4 fw-bold mb-0">{contactPageSubmissions}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100 bg-info bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '48px', height: '48px'}}>
                  <span style={{fontSize: '1.5rem'}}>42%</span>
                </div>
                <div>
                  <div className="text-muted small">Response Rate</div>
                  <div className="h4 fw-bold mb-0">42%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column - Tracking & Controls */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                      style={{width: '32px', height: '32px'}}>📋</span>
                Your Tracking Code
              </h5>
              <p className="text-muted small mb-3">Add this before &lt;/body&gt; tag on your website</p>
              
              <div className="bg-dark text-light rounded p-3 mb-3">
                <pre className="mb-0" style={{ fontSize: '12px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                  {trackingCode}
                </pre>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(trackingCode);
                    alert('✅ Tracking code copied to clipboard!\n\nPaste this before </body> tag on your website.');
                  }}
                  className="btn btn-success d-flex align-items-center justify-content-center py-2"
                >
                  <span className="me-2">📋</span>
                  Copy Tracking Code
                </button>
                
                <a 
                  href="http://localhost:5000/demo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center py-2"
                >
                  <span className="me-2">🔗</span>
                  Open Demo Website
                </a>
              </div>
              
              <div className="mt-4 pt-3 border-top">
                <h6 className="small fw-bold mb-2">📝 Quick Instructions:</h6>
                <ol className="small text-muted ps-3 mb-0">
                  <li className="mb-2">Copy the tracking code above</li>
                  <li className="mb-2">Paste it before the &lt;/body&gt; tag on your website</li>
                  <li className="mb-2">All form submissions will be tracked automatically</li>
                  <li>View submissions here in real-time</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Submissions Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <h5 className="card-title mb-3 mb-md-0">
                  <span className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                        style={{width: '32px', height: '32px'}}>📨</span>
                  Recent Submissions
                </h5>
                <div className="d-flex gap-2">
                  <button 
                    onClick={handleExport}
                    className="btn btn-outline-secondary d-flex align-items-center"
                  >
                    <span className="me-2">📥</span>
                    Export CSV
                  </button>
                  <button 
                    onClick={() => setSubmissions([])}
                    className="btn btn-outline-danger"
                    title="Clear all data"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Message</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr 
                        key={sub.id} 
                        className={sub.date === 'Just now' ? 'table-success new-submission' : ''}
                      >
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                              {sub.name.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-semibold">{sub.name}</div>
                              {sub.date === 'Just now' && (
                                <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 small">
                                  NEW • Just now
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-muted">
                          <a href={`mailto:${sub.email}`} className="text-decoration-none">
                            {sub.email}
                          </a>
                        </td>
                        <td>
                          <div className="text-truncate" style={{ maxWidth: '200px' }} title={sub.message}>
                            {sub.message}
                          </div>
                        </td>
                        <td>
                          <div className="small">{sub.time}</div>
                          <div className="very-small text-muted">{sub.date}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{sub.page}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {submissions.length === 0 && (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3">📭</div>
                  <h5 className="text-muted">No submissions yet</h5>
                  <p className="text-muted small">Add the tracking code to your website to see submissions here</p>
                  <button 
                    onClick={() => setSubmissions([
                      { id: 1, name: 'Demo User', email: 'demo@example.com', message: 'Sample submission', time: 'Now', page: '/demo', date: 'Just now' }
                    ])}
                    className="btn btn-outline-primary mt-2"
                  >
                    Load Sample Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-refresh notification */}
      {autoRefresh && (
        <div className="position-fixed bottom-0 end-0 m-3">
          <div className="toast show" role="alert">
            <div className="toast-body bg-white shadow-sm rounded border">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                  <span className="text-primary">↻</span>
                </div>
                <div>
                  <div className="fw-semibold small">Auto-refresh enabled</div>
                  <div className="very-small text-muted">New submissions appear automatically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;