const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const servicesRoutes = require('./routes/services');
const tasksRoutes = require('./routes/tasks');
const inoutRoutes = require('./routes/inout');
const inventoryRoutes = require('./routes/inventory');
const adminRoutes = require('./routes/admin');



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
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use('/admin', adminRoutes);

app.use('/inout', inoutRoutes);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Route for updating
app.put('/inout/update/:id', (req, res) => {
    const id = req.params.id;
    // Example logic to handle the update
    // You might want to interact with a database here
    console.log(`Updating In/Out status for ID: ${id}`);
    res.send(`Updated In/Out status for ID: ${id}`);
});


// Routes for /tasks
app.use('/tasks', tasksRoutes);

// Routes for /inventory
app.use('/inventory', inventoryRoutes);

// Use the services routes (this will catch all /services* routes)
app.use('/services', servicesRoutes);

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Home route with login check
app.get('/home', (req, res) => {
    if (!req.session.employee) {
        return res.redirect('/login');
    }
    res.render('home');
});

// Endpoint to fetch attendance records for the logged-in employee
app.get('/inout', async (req, res) => {
    const loggedInEmployeeId = req.session.employee ? req.session.employee.employee_id : null;
    const employee_id = req.session.employee?.employee_id; // Ensure `employee_id` is stored in the session object

    if (!employee_id) {
        // Redirect to login if the session is not set
        return res.status(401).send('Unauthorized: Please log in first');
    }

    try {
        // Fetch attendance records for the logged-in employee
        const [records] = await db.query(
            'SELECT id, branch, location, TIME_FORMAT(time_in, "%H:%i") AS time_in, TIME_FORMAT(time_out, "%H:%i") AS time_out, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM attendance WHERE employee_id = ?',
            [employee_id]
        );        

        res.render('inout', {
            employee_id,
            records,
            loggedInEmployeeId
        });
    } catch (err) {
        console.error('Error fetching attendance records:', err);
        res.status(500).send('Error fetching attendance records');
    }
});


// Route to handle updating attendance records
//naalis

// Route to handle adding attendance records
app.post('/inout/add', async (req, res) => {
    const { branch, location, time_in, date } = req.body;
    const employee_id = req.session.employee?.employee_id;

    if (!employee_id) {
        return res.status(401).send('Unauthorized: Please log in first');
    }

    try {
        // Convert the date to the local time before saving
        const localDate = new Date(date);
        localDate.setHours(localDate.getHours() + 8); // Adjust for your time zone (China Standard Time)
        
        await db.query(
            'INSERT INTO attendance (employee_id, branch, location, time_in, time_out, date) VALUES (?, ?, ?, ?, NULL, NOW())',
            [employee_id, branch, location, time_in]
        );        
        res.redirect('/inout');
    } catch (err) {
        console.error('Error adding attendance record:', err);
        res.status(500).send('Server error');
    }
});

app.post('/update-attendance', async (req, res) => {
    const { id } = req.body;
    const localTimeOut = new Date();

    console.log('Update request received:', { id, localTimeOut });

    if (!id) {
        console.error('ID not provided.');
        return res.status(400).send('ID is required.');
    }

    try {
        const [result] = await db.query(
            'UPDATE attendance SET time_out = ?, updated_at = NOW() WHERE id = ?',
            [localTimeOut, id]
        );

        console.log('SQL query result:', result);

        if (result.affectedRows === 0) {
            console.error('No record found for ID:', id);
            return res.status(404).send('Attendance record not found.');
        }

        res.redirect('/inout');
    } catch (err) {
        console.error('Error updating attendance:', err);
        res.status(500).send('Server error.');
    }
});

// Admin inventory page route with login and admin check
app.get('/admin/inventory', isAdmin, (req, res) => {
    res.render('admin/inventory'); // Render inventory page for admins
});

// EmpShop route with login check
app.get('/empshop', (req, res) => {
    if (!req.session.employee) {
        return res.redirect('/login');
    }
    res.render('empshop');
});


app.get('/inventory', (req, res) => {
    if (!req.session.employee) {
        return res.redirect('/login');
    }
    res.render('inventory');
});

// Middleware to check if user is an admin
function isLoggedIn(req, res, next) {
    if (req.session.loggedin) return next();
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.session.role === 'admin') return next();
    res.redirect('/home'); // Redirect employees to their home page
}


// Admin route with admin check
app.get('/admin', (req, res) => {
    if (!req.session || !req.session.role) {
        return res.redirect('/login'); // Redirect if the session or role doesn't exist
    }
    res.render('admin', {
        role: req.session.role // Pass the role to the EJS template
    });
});

// Login page route
app.get('/login', (req, res) => {
    res.render('login');
});



app.post('/login', async (req, res) => {
    const { employee_id, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id]);

        if (rows.length > 0) {
            const employee = rows[0];
            const match = await bcrypt.compare(password, employee.password);

            if (match) {
                req.session.loggedin = true;
                req.session.employee = employee;
                req.session.role = employee.role;

                // Redirect based on role
                if (employee.role === 'admin') {
                    return res.redirect('/admin');
                }
                return res.redirect('/home');
            }
        }
        res.status(400).send('Incorrect login credentials');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
});

// Signup page route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Signup form submission handling
app.post('/signup', async (req, res) => {
    const { employee_id, name, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO employee (employee_id, name, password) VALUES (?, ?, ?)', [employee_id, name, hashedPassword]);

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

// Services route with login check and data retrieval
app.get('/services', async (req, res) => {
    if (!req.session.employee) {
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
    const { customer_name, item, price, discount } = req.body;

    // Validate the inputs to ensure they are correct and numbers
    if (isNaN(discount) || isNaN(price) || discount < 0 || discount > 100 || price < 0) {
        return res.status(400).send("Invalid input data");
    }

    // Calculate price after discount
    const price_after_discount = price - (price * (discount / 100));

    try {
        await db.query('INSERT INTO discount_promotions (customer_name, item, price, discount, price_after_discount) VALUES (?, ?, ?, ?, ?)', 
            [customer_name, item, price, discount, price_after_discount]);
        res.redirect('/services'); // After insertion, redirect back to /services
    } catch (err) {
        console.error("Error adding discount:", err);
        res.status(500).send("Server error");
    }
});


// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
