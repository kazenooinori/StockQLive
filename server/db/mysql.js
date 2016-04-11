const logger = require("../lib/logger");
const mysql = require("mysql");
const config = require("../config");

var connection;

function handleErrorConnection () {
    connection = mysql.createConnection({
        host     : config.mysqlURL,
        user     : config.mysqlUser,
        password : config.mysqlPassword,
        database : config.mysqlDatabase,
    });
    connection.connect(function (error) {
        if (error) {
            logger.error("cannot connect to mysql");
            return;
        }
        logger.info("connected to mysql");
    });
    connection.on("error", function (error) {
        logger.error("db error", error);
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
            handleErrorConnection();
        } else {
            throw error;
        }
    });
}
handleErrorConnection();

module.exports = connection;
