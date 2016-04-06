import {combineReducers} from "redux";
import channels from "./singles/channels";
import messages from "./singles/messages";
import user from "./singles/user";

const rootReducer = combineReducers({
    channels,
    messages,
    user,
});

export default rootReducer;
