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
    siteUrl: "http://ec2-54-238-195-108.ap-northeast-1.compute.amazonaws.com:3000",
};
module.exports = config;
