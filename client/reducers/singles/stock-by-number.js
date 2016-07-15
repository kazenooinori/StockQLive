import * as types from "../../constants/action-types";
import { Map } from "immutable";

const initialState = Map();

export default function stockByNumber (state = initialState, action) {
    switch (action.type) {
        case types.ADD_STOCK_CURRENT_PRICE:
            return state.merge({
                [action.stock.number]: action.stock
            });
        default:
            return state;
    }
};
