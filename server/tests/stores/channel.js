const mocha = require("mocha");
const {assert} = require("chai");

describe("server/stores/channel.js", () => {
    describe("findChannels", () => {
        it("should pass", () => {
            assert.equal(-1, [1,2,3].indexOf(5));
        });
    });
});
