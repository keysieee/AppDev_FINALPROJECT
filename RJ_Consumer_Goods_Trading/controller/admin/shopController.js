const fs = require('fs');
const path = require('path');
const connection = require('../../config/db');

// Render the Shop Page (shop.ejs)
exports.renderShopPage = (req, res) => {
    // Fetch any necessary data from the database if needed
    connection.query('SELECT * FROM branches', (err, branches) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching branches');
        }
        res.render('admin/shop', { branches });  // Pass fetched branches to the view
    });
};

// Add Branch function using Multer
exports.addBranch = (req, res) => {
    // Access the uploaded file and form fields
    const { branch_name, location, manager_name, contact_number, year_established } = req.body;
    const branch_photo = req.file; // This will contain the uploaded file info

    if (!branch_photo) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Read the file buffer if needed (optional)
    const branch_photo_buffer = fs.readFileSync(branch_photo.path); // Read the file into a buffer

    const query = 'INSERT INTO branches (branch_name, location, manager_name, contact_number, year_established, branch_photo) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [branch_name, location, manager_name, contact_number, year_established, branch_photo_buffer], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the actual database error
            return res.status(500).json({ success: false, error: 'Error inserting branch', details: err });
        }
        // Redirect to the shop page to see the updated list of branches
        console.log('Branch added successfully, redirecting to /admin/shop');
        res.json({ success: true, message: 'Branch added successfully' });
    });
};