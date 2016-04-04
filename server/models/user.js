import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    provider: String,
    displayName: String,
    name: {
        lastName: String,
        firstName: String,
        middleName: String,
    },
    emails: String,
    photos: String,
});

module.exports = mongoose.model("User", UserSchema);
