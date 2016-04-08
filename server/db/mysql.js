const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection({
    host     : config.mysqlURL,
    user     : config.mysql_user,
    password : config.mysql_password,
    database : config.mysql_database,
});


module.exports = connection;
