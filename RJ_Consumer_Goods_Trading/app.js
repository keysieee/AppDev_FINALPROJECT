const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const app = express();

// Middleware for session
app.use(session({
    secret: 'sajdsajdasdasdjjkgfggasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware for static files and form data parsing
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Home route with login check
app.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }
    res.render('home'); // Render the homepage if logged in
});

// Shop route with login check
app.get('/empshop', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }
    res.render('empshop'); // Render the empshop view if logged in
});

// Middleware to check if user is an admin
function isAdmin(req, res, next) {
    if (req.session.loggedin && req.session.role === 'admin') {
        return next();
    }
    res.redirect('/login');
}

// Admin route with admin check
app.get('/admin', isAdmin, (req, res) => {
    res.render('admin'); 
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login');
});

// Login form submission handling
app.post('/login', async (req, res) => {
    const { id_no, password } = req.body;

    if (id_no === 'admin' && password === 'admin') {
        req.session.loggedin = true;
        req.session.role = 'admin';
        return res.redirect('/admin');
    }

    const [rows] = await db.query('SELECT * FROM users WHERE id_no = ?', [id_no]);
    if (rows.length > 0) {
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user = user; // Store user info in session
            return res.redirect('/home');
        }
    }
    res.redirect('/login'); // Invalid credentials
});

// Signup page route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup form submission handling
app.post('/signup', async (req, res) => {
    const { id_no, name, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.redirect('/signup'); // Passwords do not match
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (id_no, name, password) VALUES (?, ?, ?)', [id_no, name, hashedPassword]);

    res.redirect('/login'); // Redirect to login after signup
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
