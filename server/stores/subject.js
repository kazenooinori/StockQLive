const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const SubjectModel = require("../models/subject");

const subjectFields = "_id name uri author postedAt likes dislikes";

function getSubjectList (query) {
    const { skip = 0 } = query;
    const limit = 15;
    return new Promise((resolve, reject) => {
        SubjectModel.find({}, subjectFields)
        .sort({postedAt: -1})
        .skip(parseInt(skip))
        .limit(limit)
        .exec((error, docs) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(docs);
        });
    });
}

function getSubjectHtml (subjectId) {
    return new Promise((resolve, reject) => {
        SubjectModel.findOne({_id: new ObjectId(subjectId)}, "html")
        .exec((error, doc) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(doc);
        });
    });
}

function likeSubject (subjectId) {
    return new Promise((resolve, reject) => {
        SubjectModel.update({
            _id: new ObjectId(subjectId)
        }, {
            $inc: {
                likes: 1,
            },
        }, (error, doc) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(SubjectModel.findOne({
                _id: new ObjectId(subjectId)
            }, subjectFields));
        });
    });
}

function dislikeSubject (subjectId) {
    return new Promise((resolve, reject) => {
        SubjectModel.update({
            _id: new ObjectId(subjectId)
        }, {
            $inc: {
                dislikes: 1,
            },
        }, (error, doc) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(SubjectModel.findOne({
                _id: new ObjectId(subjectId)
            }, subjectFields));
        });
    });
}


module.exports = {
    getSubjectList,
    getSubjectHtml,
    likeSubject,
    dislikeSubject,
};
