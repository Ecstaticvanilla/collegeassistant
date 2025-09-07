// backend/routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/teacher', attendanceController.getTeacherAttendance);
router.get('/student', attendanceController.getStudentAttendance);
router.post('/update-attended', attendanceController.updateAttendedCount);
router.post('/update-total', attendanceController.updateTotalCount);

module.exports = router;
