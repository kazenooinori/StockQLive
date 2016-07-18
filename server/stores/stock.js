const StockModel = require("../models/stock");


function filterHighChartsFormat (stock) {
    const time = new Date(stock.record_time).getTime();
    return [time, stock.latest_price];
}

function getCurrentStock () {
    return StockModel.getCurrent();
}
function getCurrentStockPrice (stockNumber) {
    return StockModel.getCurrentStockPrice(stockNumber);
}
function getStockHistory (stock) {
    return StockModel.getHistory(stock)
    .then((rows) => {
        return new Promise((resolve, reject) => {
            let stocks = rows.map(filterHighChartsFormat);
            resolve(stocks);
        });
    });
}

module.exports = {
    getCurrentStock,
    getCurrentStockPrice,
    getStockHistory,
};
