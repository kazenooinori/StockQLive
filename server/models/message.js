import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId: {
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

export default mongoose.model("Message", MessageSchema);
