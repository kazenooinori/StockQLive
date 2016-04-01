import express from "express";
import * as RequestStore from "../stores/request";
const router = express.Router();

router.get("/", (req, res) => {
    RequestStore.fetchAllRequests()
    .then((requests) => {
        res.status(200).json(requests);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    });
});
router.post("/", (req, res) => {
    const {request} = req.body;
    RequestStore.createRequest(request)
    .then((request) => {
        res.json(request);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    });
});

module.exports = router;
