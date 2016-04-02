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
    .then(() => {
        res.write("success");
        res.end();
    })
    .catch((error) => {
        res.write("error");
        res.end();
    });
});

module.exports = router;
