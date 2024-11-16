// Add attendance record
exports.addAttendance = async (req, res) => {
    const { employee_id, branch, location, in_time, out_time, date } = req.body;

    // Set default values if fields are not provided
    const currentDate = new Date();
    const currentDateFormatted = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const currentTimeFormatted = currentDate.toISOString().split('T')[1].slice(0, 5); // Format as HH:MM

    try {
        await db.query(
            'INSERT INTO attendance (employee_id, branch, location, in_time, out_time, date) VALUES (?, ?, ?, ?, ?, ?)',
            [
                employee_id, 
                branch, 
                location, 
                in_time || currentTimeFormatted,  // Default in_time if not provided
                out_time || currentTimeFormatted,  // Default out_time if not provided
                date || currentDateFormatted       // Default date if not provided
            ]
        );
        res.redirect('/inout');
    } catch (err) {
        console.error("Error adding attendance record:", err);
        res.status(500).send("Server error");
    }
};


// Update attendance record
exports.updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { in_time, out_time, branch, location } = req.body;
    const sql = 'UPDATE attendance SET in_time = ?, out_time = ?, branch = ?, location = ? WHERE id = ?';
    try {
        await db.query(sql, [in_time, out_time, branch, location, id]);
        res.redirect('/inout');
    } catch (err) {
        console.error("Error updating attendance record:", err);
        res.status(500).send("Server error");
    }
};
