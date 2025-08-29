// backend/controllers/attendanceController.js

const db = require('../db');

exports.getTeacherAttendance = async (req, res) => {
    const { subject, activity, division } = req.query;
    try {
        // Fetch students in the selected division
        const [students] = await db.execute('SELECT id, name FROM students WHERE division = ?', [division]);

        // Fetch total classes for the subject and activity
        const [totalClasses] = await db.execute('SELECT month, total_count FROM attendance_records WHERE subject = ? AND activity_type = ? AND student_id IS NULL', [subject, activity]);
        const totalClassesMap = {};
        totalClasses.forEach(row => totalClassesMap[row.month] = row.total_count);

        // Fetch attended counts for each student
        const attendance = {};
        for (const student of students) {
            const [attendedCounts] = await db.execute('SELECT month, attended_count FROM attendance_records WHERE student_id = ? AND subject = ? AND activity_type = ?', [student.id, subject, activity]);
            const attendedMap = {};
            attendedCounts.forEach(row => attendedMap[row.month] = row.attended_count);
            attendance[student.id] = { name: student.name, attendance: attendedMap };
        }

        res.status(200).json({ attendance, totalClasses: totalClassesMap });
    } catch (error) {
        console.error('Error fetching teacher attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateAttendedCount = async (req, res) => {
    const { studentId, subject, activity, month, newAttended } = req.body;
    try {
        await db.execute(
            'UPDATE attendance_records SET attended_count = ? WHERE student_id = ? AND subject = ? AND activity_type = ? AND month = ?',
            [newAttended, studentId, subject, activity, month]
        );
        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        console.error('Error updating attended count:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTotalCount = async (req, res) => {
    const { subject, activity, division, month, newTotal } = req.body;
    try {
        // Total counts are stored without a student_id, but per division
        await db.execute(
            'UPDATE attendance_records SET total_count = ? WHERE subject = ? AND activity_type = ? AND division = ? AND month = ?',
            [newTotal, subject, activity, division, month]
        );
        res.status(200).json({ message: 'Total classes updated successfully' });
    } catch (error) {
        console.error('Error updating total count:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStudentAttendance = async (req, res) => {
    const { studentId } = req.query;
    try {
        const [studentInfo] = await db.execute('SELECT name, division, batch FROM students WHERE id = ?', [studentId]);
        if (studentInfo.length === 0) return res.status(404).json({ message: 'Student not found' });

        const student = studentInfo[0];
        
        // Fetch student's attendance records
        const [records] = await db.execute('SELECT subject, activity_type, month, attended_count FROM attendance_records WHERE student_id = ?', [studentId]);
        
        // Fetch total classes for the student's division
        const [totalClasses] = await db.execute('SELECT subject, activity_type, month, total_count FROM attendance_records WHERE division = ? AND student_id IS NULL', [student.division]);

        const attendance = {};
        records.forEach(row => {
            if (!attendance[row.subject]) attendance[row.subject] = { lectures: {}, labs: {} };
            attendance[row.subject][row.activity_type][row.month] = row.attended_count;
        });
        
        const totalClassesMap = {};
        totalClasses.forEach(row => {
            if (!totalClassesMap[row.subject]) totalClassesMap[row.subject] = { lectures: {}, labs: {} };
            totalClassesMap[row.subject][row.activity_type][row.month] = row.total_count;
        });

        res.status(200).json({
            studentInfo: { name: student.name, division: student.division, totalClasses: totalClassesMap },
            attendance
        });
    } catch (error) {
        console.error('Error fetching student attendance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
