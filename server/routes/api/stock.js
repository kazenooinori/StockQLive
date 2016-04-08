const express = require("express");
const router = express.Router();
const StockStore = require("../../stores/stock");

router.get("/", (req, res) => {
    StockStore.findStocks()
    .then((rows) => {
        res.json(rows);
    })
    .catch((error) => {
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