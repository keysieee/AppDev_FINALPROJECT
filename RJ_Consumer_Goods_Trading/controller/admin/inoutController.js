const Attendance = require('../../models/admin/inoutModel');

exports.getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.findAll();
        res.render('admin/inOut', { attendanceRecords });
    } catch (err) {
        res.status(500).send('Error loading attendance records.');
    }
};
