const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const SubjectModel = require("../models/subject");

const subjectFields = "_id name uri author postedAt likes dislikes views";

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

function incSubjectLike (subjectId, count) {
    return new Promise((resolve, reject) => {
        SubjectModel.update({
            _id: new ObjectId(subjectId)
        }, {
            $inc: {
                likes: count,
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

function incSubjectDislike (subjectId, count) {
    return new Promise((resolve, reject) => {
        SubjectModel.update({
            _id: new ObjectId(subjectId)
        }, {
            $inc: {
                dislikes: count,
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

function viewSubject (subjectId) {
    return new Promise((resolve, reject) => {
        SubjectModel.update({
            _id: new ObjectId(subjectId)
        }, {
            $inc: {
                views: 1,
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
    incSubjectLike,
    incSubjectDislike,
    viewSubject,
};
