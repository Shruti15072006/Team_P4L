# Team_P4L

A real-time data analytics platform built for the DataPulse Hackathon to transform raw data into actionable insights.

# DataPulse - Real-time Form Submission Tracker

## 📋 Overview

DataPulse is a powerful, real-time form submission tracking dashboard that captures, monitors, and analyzes form submissions from any website. Track contact forms, sign-ups, and inquiries in real-time with instant notifications.

## 🚀 Features

### ✅ Core Features

- **Real-time Tracking**: Live form submission monitoring with Socket.IO
- **Instant Notifications**: Browser notifications for new submissions
- **Comprehensive Dashboard**: Visual stats and analytics
- **Export Capabilities**: Download submissions as CSV
- **Auto-refresh**: Automatic data updates every 30 seconds
- **Demo Website**: Built-in demo form for testing

### 📊 Analytics Dashboard

- **Total Submissions**: All-time submission count
- **Today's Activity**: Submissions received today
- **Contact Forms**: Number of contact form submissions

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Bootstrap 5** for responsive UI
- **Socket.IO Client** for real-time updates
- **React Router** for navigation

### Backend (Separate Repository)

- **Node.js** with Express
- **Socket.IO** for real-time communication
- **REST API** endpoints

## 🏗️ Project Structure

```
📁 PROJECT STRUCTURE
desktop/Team_P4L/
├── 📁 backend/                 (Port 5000)
│   ├── 📄 server.js           ← Main backend server
│   ├── 📄 package.json
│   └── 📁 public/
│       ├── 📄 demo.html       ← Demo form website
│       └── 📄 tracker.js      ← Tracking script for websites
│
└── 📁 frontend/               (Port 3000)
    ├── 📄 package.json
    ├── 📁 public/
    │   └── 📄 index.html      ← React entry point
    └── 📁 src/
        ├── 📄 App.tsx         ← Main React app
        ├── 📄 login.tsx       ← Login/Register page
        ├── 📄 index.tsx       ← React renderer
        ├── 📁 components/
        │   └── 📄 Dashboard.tsx ← Main dashboard
        ├── 📁 config/
        │   └── 📄 api.js      ← API configuration
        └── 📁 services/
            ├── 📄 auth.js     ← Authentication service
            ├── 📄 dataService.js ← Data fetching
            └── 📄 socketService.js ← WebSocket service
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on `http://localhost:5000`

### Step 1: Clone and Install

```bash
# Clone the repository
git clone [your-repo-url]
cd datapulse-frontend

# Install dependencies
npm install
# or
yarn install
```

### Step 2: Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
REACT_APP_API_URL=http://localhost:5000
```

### Step 3: Start Development Server

```bash
# Start the frontend
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

## 📡 Integration Guide

### Getting Your API Key

1. Login to DataPulse dashboard
2. Copy your unique API key from the tracking code section

### Adding to Your Website

Add this code before the `</body>` tag on every page with forms:

```html
<script>
  window.dataPulseKey = "YOUR_API_KEY_HERE";
</script>
<script src="http://localhost:5000/tracker.js"></script>
```

### Automatic Form Tracking

Once added, DataPulse automatically:

- Captures all form submissions
- Tracks user information
- Records the page URL
- Timestamps each submission

## 🎯 Dashboard Usage

### 1. Real-time Monitoring

- **Live Counter**: Displays total active submissions
- **Auto-refresh**: Toggle automatic updates
- **Manual Refresh**: Click refresh button for instant update

### 2. Submission Management

- **View Details**: See name, email, message, time, and page
- **Email Contacts**: Click email addresses to respond
- **Filter**: New submissions highlighted as "Just now"

### 3. Data Export

- **CSV Export**: Download all submissions
- **Data Clearing**: Clear dashboard data (local only)

### 4. Demo Testing

- **Demo Form**: Test with the built-in demo
- **Real-time Feedback**: See submissions appear instantly

## 🔐 Authentication

### Login Process

1. Enter your API key
2. Key is stored in localStorage
3. Automatic redirection to dashboard
4. Persistent session until logout

### Security Features

- API key validation
- Protected routes
- Secure localStorage handling
- Backend authentication

## 📱 Responsive Design

- **Mobile-first approach**
- Bootstrap grid system
- Adaptive table layouts
- Touch-friendly controls

## 🔔 Real-time Features

### Socket.IO Integration

- **Instant Updates**: New submissions appear without refresh
- **Connection Management**: Automatic reconnection
- **Room-based Updates**: Isolated by API key

### Browser Notifications

- **Permission Request**: One-time browser permission
- **Desktop Alerts**: New submission notifications
- **Click to Focus**: Direct to dashboard

## 📈 Analytics Metrics

### Calculated Metrics

- **Total Submissions**: Cumulative count
- **Today's Activity**: Daily submission volume
- **Engagement Rate**: (Today / Total) × 100%
- **Form Distribution**: Contact form tracking

### Data Visualization

- Color-coded stat cards
- Progress indicators
- Real-time counters
- Historical trend display

## 🔄 Auto-refresh System

- **30-second intervals**: Automatic data polling
- **Toggle Control**: Enable/disable auto-refresh
- **Visual Indicator**: On-screen status notification
- **Manual Override**: Refresh anytime

## 📤 Data Export

### CSV Export Features

- **Complete Data**: All submission fields
- **Formatted Columns**: Proper CSV escaping
- **Timestamped Files**: Automatic date in filename
- **One-click Download**: Simple export process

### Export Format

```csv
Name,Email,Message,Time,Page,Date
"John Doe","john@example.com","Hello","14:30","/contact","Just now"
```

## 🧪 Testing & Development

### Development Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# TypeScript check
npx tsc --noEmit
```

### Testing Features

1. Use the demo website (`http://localhost:5000/demo`)
2. Submit test forms
3. Watch real-time updates
4. Test export functionality

## 🐛 Troubleshooting

### Common Issues

#### 1. No Data Displayed

- Check backend is running on `localhost:5000`
- Verify API key in localStorage
- Check browser console for errors

#### 2. Real-time Not Working

- Ensure Socket.IO server is running
- Check network connectivity
- Verify API key matches backend

#### 3. Export Issues

- Ensure submissions exist
- Check browser download permissions
- Verify CSV format compatibility

#### 4. Styling Problems

- Clear browser cache
- Check Bootstrap CDN connectivity
- Verify CSS import order

### Debug Mode

Enable debug logging by uncommenting console logs in:

- `fetchData()` function
- Socket.IO event handlers

## 📖 API Reference

### Frontend API Calls

```javascript
// Fetch submissions
GET /api/submissions?apiKey={key}

// Fetch statistics
GET /api/submissions/stats?apiKey={key}
```

### WebSocket Events

```javascript
// Join user room
socket.emit("join", apiKey);

// Receive new submissions
socket.on("newSubmission", callback);
```

## 🔮 Future Enhancements

### Planned Features

- **Advanced Filtering**: Search and filter submissions
- **Team Collaboration**: Multi-user dashboard access
- **Email Integration**: Direct response from dashboard
- **Analytics Charts**: Visual trend graphs
- **Custom Fields**: Support for custom form fields
- **Webhook Support**: Integration with other services

### Potential Improvements

- **Pagination**: Handle large submission volumes
- **Data Backup**: Cloud synchronization
- **Advanced Security**: OAuth integration
- **Mobile App**: Native mobile application

## 🤝 Contributing

### Development Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript best practices
4. Test thoroughly
5. Submit pull request

### Code Standards

- Use TypeScript strict mode
- Follow React hooks best practices
- Maintain responsive design
- Include appropriate comments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help

- Check the troubleshooting section
- Review browser console logs
- Verify backend connectivity
- Test with demo forms

### Reporting Issues

1. Describe the problem
2. Include steps to reproduce
3. Share error messages
4. Provide environment details

## 🙏 Acknowledgments

### Built With

- **React**: Frontend framework
- **TypeScript**: Type safety
- **Bootstrap**: UI components
- **Socket.IO**: Real-time communication

### Inspiration

- Form tracking solutions
- Real-time analytics dashboards
- Customer relationship tools

---

**DataPulse** - Never miss another form submission again! ✨
