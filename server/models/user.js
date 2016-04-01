import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
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

export default mongoose.model("User", UserSchema);
