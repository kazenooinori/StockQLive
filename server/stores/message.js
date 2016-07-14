const MessageModel = require("../models/message");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;

function createMessage (attributes) {
    return new Promise((resolve, reject) => {
        MessageModel.create({
            senderId: attributes.senderId,
            senderDisplayName: attributes.senderDisplayName,
            chatroomId: attributes.chatroomId,
            content: attributes.content,
        }, (error, message) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(message);
        });
    });
}

function findMessage (attributes) {
    return MessageModel.find({
        chatroomId: attributes.chatroomId,
    }, "senderId senderDisplayName chatroomId content createdAt updatedAt").exec();
}

module.exports = {
    createMessage,
    findMessage,
};
