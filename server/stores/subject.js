const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const SubjectModel = require("../models/subject");

function getSubjectList () {
    return new Promise((resolve, reject) => {
        SubjectModel.find({}, "_id name uri author postedAt")
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


module.exports = {
    getSubjectList,
    getSubjectHtml,
};
