import {combineReducers} from "redux";
import messages from "./singles/messages";
import user from "./singles/user";

const rootReducer = combineReducers({
    messages,
    user,
});

export default rootReducer;
