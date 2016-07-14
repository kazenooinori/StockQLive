const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId: {
        type: String,
        required: true,
    },
    senderDisplayName: {
        type: String,
        required: true,
    },
    senderPhoto: {
        type: String,
    },
    chatroomId: {
        type: String,
        required: true,
    },
    content: {
        type: Schema.Types.Mixed,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['text', 'stock', 'news'],
        default: 'text',
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Message", MessageSchema);
