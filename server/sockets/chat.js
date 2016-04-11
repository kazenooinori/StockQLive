const logger = require("../lib/logger");
const Socket = require('socket.io');
const MessageStore = require('../stores/message');

export default function chatSocket (server) {
    const io = Socket(server);
    const _chatSocket = io.of("/chat");
    _chatSocket.on("connection", function (socket) {
        logger.info("an user is connected");
        socket.on("disconnect", function () {
            logger.info("an user is disconnected");
        });

        socket.on("client send", function (data) {
            MessageStore.createMessage({
                senderId: data.senderId,
                senderUsername: data.senderUsername,
                chatroomId: data.chatroomId,
                content: data.content,
            })
            .then((message) => {
                _chatSocket.emit("server push", message);
                logger.info("message saved ", message);
            })
            .catch((error) => {
                logger.error("error when saving message ", error);
            });
        });
    });
}
