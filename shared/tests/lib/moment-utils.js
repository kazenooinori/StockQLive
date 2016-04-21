const mocha = require("mocha");
const {assert, expect} = require("chai");
const momentUtils = require("../../lib/moment-utils");

describe("shared/lib/moment-utils.js", () => {
    describe("relativeDateTime", () => {
        it("should convert relative date time", (done) => {
            const date = "Thu Apr 21 2016 10:00:00 GMT+0800 (CST)";
            expect(momentUtils.relativeDateTime(date)).to.equal("Today at 10:00 AM");
            done();
        });
    });
});
