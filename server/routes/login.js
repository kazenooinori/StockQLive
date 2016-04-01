const express = require("express");
const router = express.Router();
const UserStore = require("../stores/user");
const passport =

router.post("/", passport.authenticate('local'), (req, res) => {
    res.json({
        user: req.user
    });
});
