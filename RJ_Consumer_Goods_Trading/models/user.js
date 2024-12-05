const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async createUser(username, email, password, role) { 
        const hashedPassword = await bcrypt.hash(password, 8); // Hash password before storing

        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
                [username, email, hashedPassword, role],
                (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            console.error("User Model - Duplicate entry:", err);
                            return reject(new Error('Username or email already exists.'));
                        }
                        console.error("User Model - Database error on insert:", err);
                        return reject(err);
                    }
                    console.log("User Model - Insert successful:", result);
                    resolve(result);
                }
            );
        });
    }

    static async findUserByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM users WHERE username = ?', 
                [username],
                (err, results) => {
                    if (err) {
                        console.error("User Model - Error finding user:", err);
                        reject(err);
                    }
                    console.log("User Model - Retrieved user:", results[0]);
                    resolve(results[0]);
                }
            );
        });
    }

    // Get all members with a "User/Member" role
    static async getAllMembers() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE role = "User/Member"', (err, results) => {
                if (err) {
                    console.error("User Model - Error fetching members:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    // Find a user by their ID
    static async findById(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
                if (err) {
                    console.error("User Model - Error finding user by ID:", err);
                    return reject(err);
                }
                resolve(results[0] || null); // Return user if found, otherwise null
            });
        });
    }

    // Update user information by ID
    static async update(userId, updatedUser) {
        const { username, email, firstName, lastName, address, contactNumber, dob, gender } = updatedUser;
        return new Promise((resolve, reject) => {
            db.query(`
                UPDATE users 
                SET username = ?, email = ?, firstName = ?, lastName = ?, address = ?, contactNumber = ?, dob = ?, gender = ?
                WHERE id = ?`, 
                [username, email, firstName, lastName, address, contactNumber, dob, gender, userId], 
                (err, result) => {
                    if (err) {
                        console.error("User Model - Error updating user:", err);
                        return reject(err);
                    }
                    resolve(result);
                });
        });
    }
}

module.exports = User;
