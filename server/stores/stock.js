const StockModel = require("../models/stock");

function getCurrentStock () {
    return StockModel.getCurrent();
}

function getStockHistory (stockNumber) {
    return StockModel.getHistory(stockNumber);
}

module.exports = {
    getCurrentStock,
    getStockHistory,
};
