const StockModel = require("../models/stock");

function getCurrentStock () {
    return StockModel.getCurrent();
}

function getStockHistory (stockNumber) {
    return StockModel.getHistory(stockNumber)
    .then((rows) => {
        return new Promise((resolve, reject) => {
            let stocks = rows.map((row) => {
                const time = new Date(row.record_time).getTime();
                return [time, row.latest_price];
            });
            resolve(stocks);
        });
    });
}

module.exports = {
    getCurrentStock,
    getStockHistory,
};
