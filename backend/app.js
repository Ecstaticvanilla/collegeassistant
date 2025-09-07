// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gradesRoutes = require('./routes/gradesRoutes');
const timetableRoutes = require('./routes/timetableRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/timetable', timetableRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
