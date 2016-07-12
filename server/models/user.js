const mongoose = require("mongoose");
const findOneOrCreate = require('mongoose-find-one-or-create');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
    },
    facebookId: String,
    profileUrl: String,
    password: String,
    provider: String,
    displayName: String,
    name: {
        lastName: String,
        firstName: String,
        middleName: String,
    },
    email: String,
    photos: String,
});
UserSchema.plugin(findOneOrCreate);

module.exports = mongoose.model("User", UserSchema);
