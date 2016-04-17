import * as types from "../../constants/action-types";
import {List} from "immutable";

const initialState = List();
export default function messages (state = initialState, action) {
    switch (action.type) {
        case types.APPEND_MESSAGES:
            return state.concat(action.messages);
        case types.APPEND_MESSAGE:
            const {message} = action;
            let shouldAppend = true;
            state.every((existedMessage) => {
                shouldAppend = existedMessage._id !== message._id;
                return shouldAppend;
            });
            if (shouldAppend) {
                return state.push(action.message);
            }
            return state;
        default:
            return state;
    }
}
