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

// Update attendance record
router.post('/inout/update/:id', async (req, res) => {
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

// Delete attendance record
router.post('/inout/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM attendance WHERE id = ?', [id]);
        res.redirect('/inout');
    } catch (err) {
        console.error("Error deleting attendance record:", err);
        res.status(500).send("Server error");
    }
});
