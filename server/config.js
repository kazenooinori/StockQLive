const config = {
    mongoURL: process.env.MONGOURL || "mongodb://localhost:27017/cha",
    port: process.env.PORT || 3000,
    mysqlURL: process.env.MYSQLURL || "localhost",
    mysql_user: "root",
    mysql_password: "",
    mysql_database: "stock",
};
module.exports = config;
