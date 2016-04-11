const logger = require("../lib/logger");
const express = require("express");
const ChatroomStore = require("../stores/chatroom");
const MessageStore = require("../stores/message");
const router = express.Router();

router.get("/", function (req, res) {
    ChatroomStore.createChatroom()
    .then((chatroom) => {
        res.redirect("/chatroom/" + chatroom._id);
    })
    .catch((error) => {
        logger.error("error render page ", error);
        res.status(404);// 404 not found
        res.end();
    });
});
router.get("/:chatroomId", function (req, res) {
    res.render("chatroom");
});

module.exports = router;
