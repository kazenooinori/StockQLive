const logger = require("../lib/logger");
const express = require("express");
const ChatroomStore = require("../stores/chatroom");
const ChannelStore = require("../stores/channel");
const MessageStore = require("../stores/message");
const router = express.Router();


router.get("/:channelId", function (req, res, next) {
    const {channelId} = req.params;
    ChannelStore.findChannelById(channelId)
    .then((channel) => {
        res.render("chatroom", {
            chatroomId: channel.chatroomId,
            channelId: channelId,
            channelName: channel.name,
            ownerUsername: channel.ownerUsername,
        });
    })
    .catch((error) => {
        logger.error("error getting channel ", error);
        res.render("chatroom");
    });
});

module.exports = router;
