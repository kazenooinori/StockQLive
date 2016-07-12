import { combineReducers } from "redux";
import channel from "./singles/channel";
import messages from "./singles/messages";
import user from "./singles/user";
import socket from "./singles/socket";

const reducer = combineReducers({
    channel,
    messages,
    user,
    socket,
});

export default reducer;
