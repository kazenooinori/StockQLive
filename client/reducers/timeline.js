import {combineReducers} from "redux";
import stocks from "./singles/stocks";

const rootReducer = combineReducers({
    stocks,
});

export default rootReducer;
