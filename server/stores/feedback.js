const mongoose = require('mongoose');
const { ObjectId } = mongoose;
const FeedbackModel = require("../models/feedback");

function createFeedback(attributes) {
    return new Promise((resolve, reject) => {
        FeedbackModel.create(attributes, (error, doc) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(doc);
        });
    });
}

module.exports = {
    createFeedback,
};
