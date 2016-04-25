const mocha = require("mocha");
const sinon = require("sinon");
const {assert, expect} = require("chai");
const ChannelModel = require("../../models/channel");
const ChannelStore = require("../../stores/channel");

describe("server/stores/channel.js", () => {
    var stub;
    before(() => {
        stub = sinon.stub(ChannelModel, "create", (attributes, callback) => {
            const result = Object.assign({}, attributes, {
                createdAt: "2016-01-01T00:00:00Z",
                updatedAt: "2016-01-01T00:00:00Z",
            });
            callback(null, result);
        });
    });
    after(() => {
        stub.restore();
    });

    describe("findChannels", () => {
        it("should create channel", (done) => {
            const channel = {
                name: "test channel",
                ownerUsername: "dazlee",
                chatroomId: "chatroomId",
                type: "type",
            };
            const result = Object.assign({}, channel, {
                createdAt: "2016-01-01T00:00:00Z",
                updatedAt: "2016-01-01T00:00:00Z",
            });
            ChannelStore.createChannel(channel)
            .then((createdChannel) => {
                expect(createdChannel).to.deep.equal(result);
                done();
            });
        });
    });
});
