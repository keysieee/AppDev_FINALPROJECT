const connection = require('../config/db');

const shopModel = {
    getAllBranches: async () => {
        const query = 'SELECT * FROM branches';
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = shopModel;
