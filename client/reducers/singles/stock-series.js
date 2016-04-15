import * as types from "../../constants/action-types";
import Immutable from "immutable";
// just for demo
const initialState = Immutable.List.of({
    name: "0050",
    data: [[1460615400000,64.25],[1460529000000,64.05],[1460442600000,62.95],[1460356200000,63],[1460097000000,62.75],[1460010600000,62.15],[1459924200000,62.4],[1459492200000,63.9]],
});
export default function stockSeries(state = initialState, action) {
    switch (action.type) {
        case types.APPEND_STOCK_SERIES:
            return state.push(action.stockSeries);
        default:
            return state;
    }
}
