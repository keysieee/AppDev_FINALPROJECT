exports.dashboard = (req, res) => {
    res.render('admin/dashboard', { title: 'Dashboard' });
};

exports.tasks = (req, res) => {
    res.render('admin/tasks', { title: 'Tasks' });
};

exports.inout = (req, res) => {
    res.render('admin/inout', { title: 'In/Out' });
};

exports.services = (req, res) => {
    res.render('admin/services', { title: 'Services' });
};

exports.inventory = (req, res) => {
    res.render('admin/inventory', { title: 'Inventory' });
};

exports.shop = (req, res) => {
    res.render('admin/shop', { title: 'Shop' });
};


exports.employeeInfo = (req, res) => {
    res.render('admin/employeeInfo', { title: 'Employee Information' });
};
