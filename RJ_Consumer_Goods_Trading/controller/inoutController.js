// controller/inoutController.js
const db = require('../config/db');  // Correct path to your db config file

// Function to get employee attendance
const getEmployeeAttendance = async (req, res) => {
    try {
        const employeeId = req.session.employee_id; // Assuming session stores employee ID
        const [records] = await db.query('SELECT * FROM attendance WHERE employee_id = ?', [employeeId]);
        res.render('inout', { records });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Show update attendance form
const showUpdateAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const [attendanceRecord] = await db.query('SELECT * FROM attendance WHERE id = ?', [id]);
        if (!attendanceRecord) {
            console.log('Attendance Records:', records);
            return res.status(404).send("Record not found");
        }
        res.render('updateAttendance', { record: attendanceRecord });
    } catch (err) {
        console.error("Error fetching attendance record:", err);
        res.status(500).send("Server error");
    }
};

// Update attendance record
const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { time_in, time_out, branch, location } = req.body;
    const sql = 'UPDATE attendance SET time_in = ?, time_out = ?, branch = ?, location = ? WHERE id = ?';
    try {
        await db.query(sql, [time_in, time_out, branch, location, id]);
        res.redirect('/inout');
    } catch (err) {
        console.error("Error updating attendance record:", err);
        res.status(500).send("Server error");
    }
};

module.exports = {
    getEmployeeAttendance,
    showUpdateAttendance,
    updateAttendance
};
