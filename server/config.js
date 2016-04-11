const config = {
    mongoURL: process.env.MONGOURL || "mongodb://localhost:27017/cha",
    port: process.env.PORT || 3000,
    mysqlURL: process.env.MYSQLURL || "localhost",
    mysqlUser: "root",
    mysqlPassword: "",
    mysqlDatabase: "stock",

    logFilePath: "/var/log/stock_node.log",
};
module.exports = config;
