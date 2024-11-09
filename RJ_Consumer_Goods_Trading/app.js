const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const servicesRoutes = require('./routes/services');  // Importing services routes
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
        return res.redirect('/login'); 
    }
    res.render('home'); 
});

// Tasks route with login check
app.get('/tasks', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    res.render('tasks'); 
});

// InOut route with login check
app.get('/inout', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    res.render('inout'); 
});

// Inventory route with login check
app.get('/inventory', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    res.render('inventory'); 
});

// EmpShop route with login check
app.get('/empshop', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('empshop');
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
            req.session.user = user; 
            return res.redirect('/home');
        }
    }
    res.redirect('/login'); 
});

// Signup page route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup form submission handling
app.post('/signup', async (req, res) => {
    const { id_no, name, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.redirect('/signup'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (id_no, name, password) VALUES (?, ?, ?)', [id_no, name, hashedPassword]);

    res.redirect('/login'); 
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

const taskRoutes = require('./routes/tasks'); // Import the task routes
app.use('/', taskRoutes); // Use the routes

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
});

// Services route with login check and data retrieval
app.get('/services', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }

    try {
        // Retrieve return_refunds data
        const [returns] = await db.query('SELECT * FROM return_refunds');
        // Retrieve discount promotions data
        const [discounts] = await db.query('SELECT * FROM discount_promotions');

        // Render services view with return_refunds and discount data
        res.render('services', { returns, discounts });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Server error");
    }
});

// Add a return
app.post('/services/add/return', async (req, res) => {
    const { customer_name, item, quantity, reason, price } = req.body;

    try {
        await db.query('INSERT INTO return_refunds (customer_name, item, quantity, reason, price) VALUES (?, ?, ?, ?, ?)', 
            [customer_name, item, quantity, reason, price]);
        res.redirect('/services'); // After insertion, redirect back to /services
    } catch (err) {
        console.error("Error adding return:", err);
        res.status(500).send("Server error");
    }
});

// Add a discount (calculate price after discount)
app.post('/services/add/discount', async (req, res) => {
    const { customer_name, item, discount, price } = req.body;

    // Validate the inputs to ensure they are correct and numbers
    if (isNaN(discount) || isNaN(price) || discount < 0 || discount > 100 || price < 0) {
        return res.status(400).send("Invalid input data");
    }

    // Calculate price after discount
    const price_after_discount = price - (price * (discount / 100));

    try {
        await db.query('INSERT INTO discount_promotions (customer_name, item, discount, price_after_discount) VALUES (?, ?, ?, ?)', 
            [customer_name, item, discount, price_after_discount]);
        res.redirect('/services'); // After insertion, redirect back to /services
    } catch (err) {
        console.error("Error adding discount:", err);
        res.status(500).send("Server error");
    }
});

// Use the services routes (this will catch all /services* routes)
app.use('/services', servicesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
