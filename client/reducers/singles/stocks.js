import * as types from "../../constants/action-types";
export default function Stocks (state = [], action) {
    switch (action.type) {
        case types.UPDATE_STOCKS:
            return [
                ...action.stocks
            ];
        default:
            return state;
    }
}
