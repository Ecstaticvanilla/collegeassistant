// backend/routes/gradesRoutes.js

const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

router.get('/teacher', gradesController.getTeacherGrades);
router.get('/student', gradesController.getStudentGrades);
router.post('/update-grade', gradesController.updateGrade);
router.post('/update-weightage', gradesController.updateWeightage);

module.exports = router;
