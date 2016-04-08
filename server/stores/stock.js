const StockModel = require("../models/stock");

function findStocks () {
    return StockModel.find();
}

module.exports = {
    findStocks,
};
