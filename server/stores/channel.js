const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const ChannelModel = require("../models/channel");

function createChannel (attributes) {
    return new Promise((resolve, reject) => {
        ChannelModel.create(attributes, (error, channel) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(channel);
        });
    });
}
function findChannels (attributes) {
    return new Promise((resolve, reject) => {
        ChannelModel.find({}, "name ownerUsername type chatroomId")
        .exec((error, docs) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(docs);
        });
    });
}
function findChannelById (channelId) {
    return new Promise((resolve, reject) => {
        ChannelModel.findOne({_id: new ObjectId(channelId)}, "name type ownerUsername chatroomId")
        .exec((error, doc) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(doc);
        });
    });
}

module.exports = {
    createChannel,
    findChannels,
    findChannelById,
};
