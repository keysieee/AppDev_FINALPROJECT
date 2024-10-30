const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const app = express();
const router = express.Router();

app.use(session({
    secret: 'sajdsajdasdasdjjkgfggasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to the login page
});

// Routes
app.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('home');
});



function isAdmin(req, res, next) {
    if (req.session.loggedin && req.session.role === 'admin') {
        return next();
    }
    res.redirect('/login');
}

app.get('/admin', isAdmin, (req, res) => {
    res.render('admin'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { id_no, password } = req.body;

    if(id_no === 'admin' && password === 'admin') {
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


app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { id_no, name, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.redirect('/signup'); // Passwords do not match
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (id_no, name, password) VALUES (?, ?, ?)', [id_no, name, hashedPassword]);

    res.redirect('/login'); // Redirect to login after signup
});

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
