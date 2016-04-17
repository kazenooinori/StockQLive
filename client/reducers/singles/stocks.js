import * as types from "../../constants/action-types";
import {List} from "immutable";

const initialState = List();
export default function Stocks (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_STOCKS:
            return Immutable.List(action.stocks);
        default:
            return state;
    }
}
