// Add attendance record
exports.addAttendance = async (req, res) => {
    const { employee_id, branch, location, in_time, out_time, date } = req.body;
    try {
        await db.query(
            'INSERT INTO attendance (employee_id, branch, location, in_time, out_time, date) VALUES (?, ?, ?, ?, ?, ?)',
            [employee_id, branch, location, in_time, out_time, date]
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

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM attendance WHERE id = ?';
    try {
        await db.query(sql, [id]);
        res.redirect('/inout');
    } catch (err) {
        console.error("Error deleting attendance record:", err);
        res.status(500).send("Server error");
    }
};
