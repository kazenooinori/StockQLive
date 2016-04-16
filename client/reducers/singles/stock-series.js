import * as types from "../../constants/action-types";
import Immutable from "immutable";
// just for demo
const initialState = Immutable.List();
export default function stockSeries(state = initialState, action) {
    switch (action.type) {
        case types.APPEND_STOCK_SERIES:
            return state.push(action.stockSeries);
        default:
            return state;
    }
}
