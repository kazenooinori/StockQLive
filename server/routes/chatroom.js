import express from "express";
import * as ChatroomStore from "../stores/chatroom";
import * as MessageStore from "../stores/message";
const router = express.Router();

router.get("/", function (req, res) {
    ChatroomStore.createChatroom()
    .then((chatroom) => {
        res.redirect("/chatroom/" + chatroom._id);
    })
    .catch((error) => {
        console.error("error render page", error);
        res.status(404);// 404 not found
        res.end();
    });
});
router.get("/:chatroomId", function (req, res) {
    res.render("chatroom");
});


router.get("/:chatroomId/messages", function (req, res) {
    const {chatroomId} = req.params;
    MessageStore.findMessage({
        chatroomId
    })
    .then((messages) => {
        res.status(200).json(messages);
        res.end();
    })
    .catch((error) => {
        console.error("sending message error", error);
        // 204 no content
        res.status(204).write({
            message: "no message found",
        });
        res.end();
    });
});
// router.post("/:chatroomId/messages", function (req, res) {
//     const {content, senderId} = req.body;
//     MessageStore.createMessage({
//         senderId: senderId,
//         chatroomId: req.params.chatroomId,
//         content: content,
//     })
//     .then((messages) => {
//         res.status(201);
//         res.end();
//     })
//     .catch((error) => {
//         res.status(406);// 406 bad request
//         res.end();
//     });
// });

module.exports = router;
