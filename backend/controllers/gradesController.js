// backend/controllers/gradesController.js

const db = require('../db');

exports.getTeacherGrades = async (req, res) => {
    const { subject } = req.query;
    try {
        const [weights] = await db.execute('SELECT section, weight_percentage FROM weightages WHERE subject = ?', [subject]);
        const weightsMap = {};
        weights.forEach(row => weightsMap[row.section] = row.weight_percentage);

        const [grades] = await db.execute('SELECT s.id, s.name, g.section, g.mark FROM students s JOIN grades g ON s.id = g.student_id WHERE g.subject = ?', [subject]);
        const studentsGrades = {};
        grades.forEach(row => {
            if (!studentsGrades[row.id]) {
                studentsGrades[row.id] = { name: row.name, grades: {} };
            }
            studentsGrades[row.id].grades[row.section] = row.mark;
        });

        res.status(200).json({ weights: { [subject]: weightsMap }, students: studentsGrades });
    } catch (error) {
        console.error('Error fetching teacher grades:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStudentGrades = async (req, res) => {
    const { studentId } = req.query;
    try {
        const [student] = await db.execute('SELECT id, name FROM students WHERE id = ?', [studentId]);
        if (student.length === 0) return res.status(404).json({ message: 'Student not found' });
        
        const [grades] = await db.execute('SELECT subject, section, mark FROM grades WHERE student_id = ?', [studentId]);
        const studentGrades = {};
        grades.forEach(row => {
            if (!studentGrades[row.subject]) studentGrades[row.subject] = {};
            studentGrades[row.subject][row.section] = row.mark;
        });

        const [weights] = await db.execute('SELECT subject, section, weight_percentage FROM weightages');
        const allWeights = {};
        weights.forEach(row => {
            if (!allWeights[row.subject]) allWeights[row.subject] = {};
            allWeights[row.subject][row.section] = row.weight_percentage;
        });

        res.status(200).json({ student: { name: student[0].name, grades: studentGrades }, weights: allWeights });
    } catch (error) {
        console.error('Error fetching student grades:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateGrade = async (req, res) => {
    const { studentId, subject, section, newMark } = req.body;
    try {
        await db.execute('UPDATE grades SET mark = ? WHERE student_id = ? AND subject = ? AND section = ?', [newMark, studentId, subject, section]);
        res.status(200).json({ message: 'Grade updated successfully' });
    } catch (error) {
        console.error('Error updating grade:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateWeightage = async (req, res) => {
    const { subject, section, newWeight } = req.body;
    try {
        await db.execute('UPDATE weightages SET weight_percentage = ? WHERE subject = ? AND section = ?', [newWeight, subject, section]);
        res.status(200).json({ message: 'Weightage updated successfully' });
    } catch (error) {
        console.error('Error updating weightage:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
