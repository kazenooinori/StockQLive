const logger = require("../lib/logger");
const Socket = require('socket.io');
const MessageStore = require('../stores/message');
const StockStore = require('../stores/stock');

const Pattern = /^[0-9]+$/;
const numberChecker = (text) => {
    return Pattern.test(text);
}
export default function chatSocket (server) {
    const io = Socket(server);
    const _chatSocket = io.of("/chat");
    _chatSocket.on("connection", function (socket) {
        logger.info("an user is connected");
        socket.on("disconnect", function () {
            logger.info("an user is disconnected");
        });

        socket.on("client send", function (data) {
            if (data.chatroomId.indexOf("bot_channel") === -1) {
                MessageStore.createMessage({
                    senderId: data.senderId,
                    senderDisplayName: data.senderDisplayName,
                    senderPhoto: data.senderPhoto,
                    chatroomId: data.chatroomId,
                    content: data.content,
                })
                .then((message) => {
                    _chatSocket.emit("server push", message);
                })
                .catch((error) => {
                    logger.error("error when saving message ", error);
                });
            } else {
                MessageStore.createMessage({
                    senderId: data.senderId,
                    senderDisplayName: data.senderDisplayName,
                    senderPhoto: data.senderPhoto,
                    chatroomId: data.chatroomId,
                    content: data.content,
                })
                .then((message) => {
                    _chatSocket.emit("server push", message);
                    if (numberChecker(data.content)) {
                        return StockStore.getStockHistory(data.content)
                        .then((stocks) => {
                            return MessageStore.createMessage({
                                senderId: "bot",
                                senderDisplayName: "Bot",
                                senderPhoto: "/images/Bot.jpg",
                                chatroomId: data.chatroomId,
                                content: {
                                    number: data.content,
                                    data: stocks,
                                },
                                type: "stock"
                            });
                        });
                    } else {
                        return MessageStore.createMessage({
                            senderId: "bot",
                            senderDisplayName: "Bot",
                            senderPhoto: "/images/Bot.jpg",
                            chatroomId: data.chatroomId,
                            content: "請輸入股票代號"
                        });
                    }
                })
                .then((message) => {
                    _chatSocket.emit("server push", message);
                })
                .catch((error) => {
                    logger.error("error when saving message ", error);
                });
            }

        });
    });
}
