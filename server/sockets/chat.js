const Socket = require('socket.io');
const MessageStore = require('../stores/message');

export default function chatSocket (server) {
    const io = Socket(server);
    const _chatSocket = io.of("/chat");
    _chatSocket.on("connection", function (socket) {
        console.log("an user is connected");
        socket.on("disconnect", function () {
            console.log("an user is disconnected");
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
                console.log("message saved ", message);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    });
}
