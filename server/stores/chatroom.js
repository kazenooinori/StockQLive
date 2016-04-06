const ChatroomModel = require("../models/chatroom");

function createChatroom () {
    return new Promise((resolve, reject) => {
        ChatroomModel.create({name: "Test"}, (error, chatroom) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(chatroom);
        });
    });
}

module.exports = {
    createChatroom,
};
