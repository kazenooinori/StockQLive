import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    provider: {
        type: String,
    },
    displayName: {
        type: String,
    },
    name: {
        lastName: String,
        firstName: String,
        middleName: String,
    },
    emails: [
        {
            value: String,
            type: String,
        }
    ],
    photos: [
        {
            value: String,
        }
    ],
});

export default mongoose.model("User", UserSchema);
