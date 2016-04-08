import {combineReducers} from "redux";
import channel from "./singles/channel";
import channels from "./singles/channels";
import stocks from "./singles/stocks";
import messages from "./singles/messages";
import user from "./singles/user";

const rootReducer = combineReducers({
    channel,
    channels,
    stocks,
    messages,
    user,
});

export default rootReducer;
