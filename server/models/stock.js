const connection = require("../db/mysql").getConnection();
function find () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM latest_stock_info LIMIT 30', function(error, rows, fields) {
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
