// backend/controllers/timetableController.js

const db = require('../db');

exports.getTimetable = async (req, res) => {
    const { division, batch } = req.query;
    try {
        const [timetable] = await db.execute('SELECT day, time, subject, activity FROM timetables WHERE division = ? AND batch = ?', [division, batch]);
        
        const timetableByDay = {};
        timetable.forEach(period => {
            if (!timetableByDay[period.day]) timetableByDay[period.day] = [];
            timetableByDay[period.day].push({ time: period.time, subject: period.subject, activity: period.activity });
        });
        
        res.status(200).json(timetableByDay);
    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTimetable = async (req, res) => {
    const { division, batch, day, time, subject, activity } = req.body;
    try {
        await db.execute(
            'UPDATE timetables SET subject = ?, activity = ? WHERE division = ? AND batch = ? AND day = ? AND time = ?',
            [subject, activity, division, batch, day, time]
        );
        res.status(200).json({ message: 'Timetable updated successfully' });
    } catch (error) {
        console.error('Error updating timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
