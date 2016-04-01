const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cons = require('consolidate');
const session = require('express-session');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'dust');
app.engine('dust', cons.dust);
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
const serverConfig = require("./config");
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error("please make sure mongodb is running", serverConfig.mongoURL);
        return;
    }

    console.log("connected to mongoDB", serverConfig.mongoURL);
});


app.use("/", require("./routes/index"));
app.use("/chatroom", require("./routes/chatroom"));

// api
//app.use("/requests", require("./routes/request"));

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
