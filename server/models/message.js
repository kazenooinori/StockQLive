const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId: {
        type: String,
        required: true,
    },
    senderUsername: {
        type: String,
        required: true,
    },
    chatroomId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Message", MessageSchema);
