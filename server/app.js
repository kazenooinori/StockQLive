const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//
// var webpack = require("webpack");
// var webpackDevMiddleware = require("webpack-dev-middleware");
// var webpackHotMiddleware = require("webpack-hot-middleware");
// var webpackConfig = require("./webpack.config");

const cons = require('consolidate');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'dust');
app.engine('dust', cons.dust);
app.use(express.static(path.join(__dirname, '../public')));

const mongoose = require('mongoose');
import serverConfig from "./config";
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error("please make sure mongodb is running", serverConfig.mongoURL);
        return;
    }

    console.log("connected to mongoDB", serverConfig.mongoURL);
});
// var compiler = webpack(webpackConfig);
// app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
// app.use(webpackHotMiddleware(compiler));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/index"));
app.use("/chatroom", require("./routes/chatroom"));
app.use("/request-list", require("./routes/request-list"));

// api
app.use("/requests", require("./routes/request"));

// catch 404 and handle it
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers
// development envrionment only
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

// production handler, no stack trace leak to users
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});

module.exports = app;
