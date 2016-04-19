import * as types from "../constants/action-types";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../lib/fetch-utils"

export function updateStocks () {
    return function (dispatch, getState) {
        return fetch("/api/stock", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: true,
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((stocks) => {
            dispatch({
                type: types.UPDATE_STOCKS,
                stocks,
            });
        })
        .catch((error) => {
            console.error("create channel error", error);
        });
    };
}
export function fetchStockSeries (series) {
    return function (dispatch, getState) {
        const stockNumber = series[0];
        return fetch("/api/stock/"+stockNumber, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: true,
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((stockSeries) => {
            dispatch({
                type: types.APPEND_STOCK_SERIES,
                stockSeries: {
                    name: stockNumber,
                    data: stockSeries
                },
            });
        })
        .catch((error) => {
            console.error("fetch stock series error", error);
        });
    };
}
