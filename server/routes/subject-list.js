const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res) {
    res.render("subject-list");
});

module.exports = Router;
