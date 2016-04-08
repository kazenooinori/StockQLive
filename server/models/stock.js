const connection = require("../db/mysql");
function find () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM latest_stock_info LIMIT 10', function(error, rows, fields) {
            if (error) {
                reject(error);
                return;
            }
            resolve(rows);
        });
    });
}

module.exports = {
    find,
};
