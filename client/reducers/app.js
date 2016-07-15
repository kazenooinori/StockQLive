import { combineReducers } from "redux";
import channel from "./singles/channel";
import messages from "./singles/messages";
import user from "./singles/user";
import socket from "./singles/socket";
import stockByNumber from "./singles/stock-by-number";

const reducer = combineReducers({
    channel,
    messages,
    user,
    socket,
    stockByNumber,
});

export default reducer;
