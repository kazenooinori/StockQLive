const express = require("express");
const router = express.Router();
const UserStore = require("../stores/user");

router.get("/me", (req, res) => {
    if (!req.user) {
        res.writeHead(401);
        res.end();
        return;
    }
    res.json(req.user);
});

module.exports = router;
