const SubjectModel = require("../models/subject");

function getSubjectList () {
    return new Promise((resolve, reject) => {
        SubjectModel.find({}, "name")
        .exec((error, docs) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(docs);
        });
    });
}


module.exports = {
    getSubjectList
};
