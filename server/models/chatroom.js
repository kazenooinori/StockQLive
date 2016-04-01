import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    name: {type: String, required: true},
}, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
});

export default mongoose.model("Chatroom", ChatroomSchema);
