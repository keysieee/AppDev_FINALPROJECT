// models/user.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static createUser(employee_id, name, password) {
        return new Promise((resolve, reject) => {
            const hashedPassword = bcrypt.hashSync(password, 10);
            db.query('INSERT INTO users (employee_id, name, password) VALUES (?, ?, ?)', [employee_id, name, hashedPassword], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

    static findUserById(employee_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE employee_id = ?', [employee_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = User;
