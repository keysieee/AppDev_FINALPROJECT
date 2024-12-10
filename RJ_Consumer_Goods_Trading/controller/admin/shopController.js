const fs = require('fs');
const path = require('path');
const db = require('../../config/db');

// Render the Shop Page
exports.renderShopPage = (req, res) => {
    db.query('SELECT * FROM branches', (err, branches) => {
        if (err) {
            console.error(err); // Log error details
            return res.status(500).send('Error fetching branches');
        }
        res.render('admin/shop', { branches });
    });
};

// Add Branch
exports.addBranch = (req, res) => {
    const { branch_name, location, manager_name, contact_number, year_established } = req.body;

    // Validate required fields
    if (!branch_name || !location || !manager_name || !contact_number || !year_established) {
        console.log('Validation Error: Missing required fields');
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const query = 'INSERT INTO branches (branch_name, location, manager_name, contact_number, year_established) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [branch_name, location, manager_name, contact_number, year_established], (err, results) => {
        if (err) {
            console.error('Database Insert Error:', err); // Detailed error log
            return res.status(500).json({ success: false, error: 'Error inserting branch', details: err });
        }
        console.log('Branch added successfully:', results);
        res.json({ success: true, message: 'Branch added successfully', data: results });
    });
};

// Update Branch
exports.updateBranch = (req, res) => {
    const { branch_id, branch_name, location, manager_name, contact_number, year_established } = req.body;

    const query = `UPDATE branches 
                   SET branch_name = ?, location = ?, manager_name = ?, contact_number = ?, year_established = ? 
                   WHERE branch_id = ?`;
    db.query(query, [branch_name, location, manager_name, contact_number, year_established, branch_id], (err, results) => {
        if (err) {
            console.error('Error updating branch:', err);
            return res.status(500).json({ success: false, error: 'Error updating branch', details: err });
        }
        res.json({ success: true, message: 'Branch updated successfully' });
    });
};

// Delete Branch
exports.deleteBranch = (req, res) => {
    const { branch_id } = req.params;

    const query = 'DELETE FROM branches WHERE branch_id = ?';
    db.query(query, [branch_id], (err, results) => {
        if (err) {
            console.error('Error deleting branch:', err);
            return res.status(500).json({ success: false, error: 'Error deleting branch', details: err });
        }
        res.json({ success: true, message: 'Branch deleted successfully' });
    });
};
