import mongoose from "mongoose";
const {Schema} = mongoose;

const RequestSchema = new Schema({
    ownerId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

export default mongoose.model("Request", RequestSchema);
