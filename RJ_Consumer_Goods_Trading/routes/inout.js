// Add attendance record
router.post('/inout/add', async (req, res) => {
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
});

// Update attendance - Show form
exports.showUpdateAttendance = async (req, res) => {
    const { id } = req.params;
    try {
        const [attendanceRecord] = await db.query('SELECT * FROM attendance WHERE id = ?', [id]);
        if (!attendanceRecord) {
            return res.status(404).send("Record not found");
        }
        res.render('updateAttendance', { record: attendanceRecord });
    } catch (err) {
        console.error("Error fetching attendance record:", err);
        res.status(500).send("Server error");
    }
};

// Update attendance - Process form
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

// Use PATCH or PUT instead of POST for updating
router.patch('/inout/update/:id', async (req, res) => {
    const { id } = req.params;
    const { in_time, out_time } = req.body;
    try {
        await db.query(
            'UPDATE attendance SET in_time = ?, out_time = ? WHERE id = ?',
            [in_time, out_time, id]
        );
        res.redirect('/inout');
    } catch (err) {
        console.error("Error updating attendance record:", err);
        res.status(500).send("Server error");
    }
});
