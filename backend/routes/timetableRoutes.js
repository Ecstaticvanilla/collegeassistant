// backend/routes/timetableRoutes.js

const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

router.get('/teacher', timetableController.getTimetable);
router.get('/student', timetableController.getTimetable);
router.post('/update', timetableController.updateTimetable);

module.exports = router;
