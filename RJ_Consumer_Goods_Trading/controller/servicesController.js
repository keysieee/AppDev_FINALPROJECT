const pool = require('../config/db');

// Get all returns
exports.getReturns = async (req, res) => {
    try {
        const [returns] = await pool.query('SELECT * FROM return_refunds');
        res.status(200).json(returns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch returns' });
    }
};

// Get all discounts
exports.getDiscounts = async (req, res) => {
    try {
        const [discounts] = await pool.query('SELECT * FROM discounts');
        res.status(200).json(discounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch discounts' });
    }
};

// Add a new return
exports.addReturn = async (req, res) => {
    const { customer_name, item, quantity, reason, price } = req.body;
    try {
        await pool.query('INSERT INTO return_refunds (customer_name, item, quantity, reason, price) VALUES (?, ?, ?, ?, ?)', 
            [customer_name, item, quantity, reason, price]);
        res.status(201).json({ message: 'Return added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add return' });
    }
};

// Add a new discount
exports.addDiscount = async (req, res) => {
    const { customer_name, item, discount, price_after_discount } = req.body;
    try {
        await pool.query('INSERT INTO discount_promotions (customer_name, item, discount, price_after_discount) VALUES (?, ?, ?, ?)', 
            [customer_name, item, discount, price_after_discount]);
        res.status(201).json({ message: 'Discount added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add discount' });
    }
};

// Update a return
exports.updateReturn = async (req, res) => {
    const { id } = req.params;
    const { customer_name, item, quantity, reason, price } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE return_refunds SET customer_name = ?, item = ?, quantity = ?, reason = ?, price = ? WHERE id = ?',
            [customer_name, item, quantity, reason, price, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Return not found' });
        }

        res.status(200).json({ message: 'Return updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update return' });
    }
};

// Update a discount
exports.updateDiscount = async (req, res) => {
    const { id } = req.params;
    const { name, percentage, start_date, end_date } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE discounts SET name = ?, percentage = ?, start_date = ?, end_date = ? WHERE id = ?',
            [name, percentage, start_date, end_date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Discount not found' });
        }

        res.status(200).json({ message: 'Discount updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update discount' });
    }
};

// Delete a return
exports.deleteReturn = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM return_refunds WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Return not found' });
        }
        res.status(200).json({ message: 'Return deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete return' });
    }
};

// Delete a discount
exports.deleteDiscount = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM discount_promotions WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete discount' });
    }
};
