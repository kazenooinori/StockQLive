import {combineReducers} from "redux";
import channel from "./singles/channel";
import channels from "./singles/channels";
import stocks from "./singles/stocks";
import stockSeries from "./singles/stock-series";
import messages from "./singles/messages";
import user from "./singles/user";

const rootReducer = combineReducers({
    channel,
    channels,
    stocks,
    stockSeries,
    messages,
    user,
});

export default rootReducer;
