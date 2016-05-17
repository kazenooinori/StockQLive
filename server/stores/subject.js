const SubjectModel = require("../models/subject");

function getSubjectList () {
    return new Promise((resolve, reject) => {
        resolve([
            {
                name: "[標的] 2001 哈哈",
            },
            {
                name: "[標的] 2001 哈哈摟",
            }
        ]);
    });
}


module.exports = {
    getSubjectList
};
