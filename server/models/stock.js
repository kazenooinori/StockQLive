const mysql = require("../db/mysql");
function find () {
    return new Promise((resolve, reject) => {
        mysql.getConnection()
        .then((connection) => {
            connection.query('SELECT * FROM latest_stock_info LIMIT 30', function(error, rows, fields) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(rows);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}

module.exports = {
    find,
};
