const config = {
    mongoURL: process.env.MONGOURL || "mongodb://localhost:27017/cha",
    port: process.env.PORT || 3000,
};
export default config;
