const mongoose = require("mongoose");
const {Schema} = mongoose;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
});

module.exports = mongoose.model("Subject", SubjectSchema);
