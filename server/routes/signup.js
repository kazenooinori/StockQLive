const express = require("express");
const router = express.Router();
const UserStore = require("../stores/user");

router.post("/", (req, res) => {
    const body = req.body;
    const attributes = {
        username: body.username,
        password: body.password,
    };
    UserStore.signup(attributes)
    .then((user) => {
        res.json(user);
        res.end();
    })
    .catch((error) => {
        console.error(error);
        res.json(error);
        res.end();
    });
});

module.exports = router;
