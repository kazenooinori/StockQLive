const logger = require("../../lib/logger");
const express = require("express");
const router = express.Router();
const SubjectStore = require("../../stores/subject");

router.get("/", (req, res) => {
    SubjectStore.getSubjectList(req.query)
    .then((subjects) => {
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8",
        })
        res.write(JSON.stringify(subjects));
        res.end();
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

router.get("/:subjectId", (req, res) => {
    SubjectStore.getSubjectHtml(req.params.subjectId)
    .then((subject) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        })
        res.write(subject.html);
        res.end();
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

router.post("/:subjectId/like", (req, res) => {
    SubjectStore.likeSubject(req.params.subjectId)
    .then((subject) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        })
        res.write(JSON.stringify(subject));
        res.end();
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

router.post("/:subjectId/dislike", (req, res) => {
    SubjectStore.dislikeSubject(req.params.subjectId)
    .then((subject) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        })
        res.write(JSON.stringify(subject));
        res.end();
    })
    .catch((error) => {
        logger.error("error when getting stock info", error);
        res.writeHead(400, {
            "Content-Type": "application/json",
        });
        res.write(JSON.stringify({
            message: "bad request",
        }));
        res.end();
    });
});

module.exports = router;
