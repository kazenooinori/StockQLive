const express = require("express");
const router = express.Router();
const UserStore = require("../stores/user");
const passport = require("passport");

router.post("/", passport.authenticate('local', {failureFlash: true}), (req, res) => {
    res.json({
        user: req.user
    });
});

module.exports = router;
