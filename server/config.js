const config = {
    mongoURL: process.env.MONGOURL || "mongodb://localhost:27017/cha",
    port: process.env.PORT || 3000,
    mysqlConfig: {
        host: process.env.MYSQLURL || "localhost",
        user: "root",
        password: "",
        database: "stock",
        ConnectionLimit: 10,
    },

    logFilePath: "/var/log/stock_node.log",
};
module.exports = config;
