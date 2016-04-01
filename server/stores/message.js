import MessageModel from "../models/message";
import mongoose from "mongoose";
const {ObjectId} = mongoose.Types;

export function createMessage (attributes) {
    return new Promise((resolve, reject) => {
        MessageModel.create({
            senderId: attributes.senderId,
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

export function findMessage (attributes) {
    return MessageModel.find({
        chatroomId: attributes.chatroomId,
    }, "senderId chatroomId content createdAt updatedAt").exec();
}
