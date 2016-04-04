const express = require("express");
const router = express.Router();
const UserStore = require("../stores/user");
const passport = require("passport");

const passportConfig = {
    successFlash: "successfully log in",
    failureFlash: "incorrect username or password",
};
router.post("/", (req, res) => {
    req.login(req.body, function(err) {
        if (err) { return next(err); }
        res.json({
            user: req.user
        });
    });
});

module.exports = router;
