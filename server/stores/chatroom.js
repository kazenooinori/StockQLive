import Chatroom from "../models/chatroom";

export function createChatroom () {
    return new Promise((resolve, reject) => {
        Chatroom.create({name: "Test"}, (error, chatroom) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(chatroom);
        });
    });
}
