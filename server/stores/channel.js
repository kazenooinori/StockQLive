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
        ChannelModel.find({}, "name ownerUsername chatroomId")
        .exec((error, docs) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(docs);
        });
    });
}

module.exports = {
    createChannel,
    findChannels,
};
