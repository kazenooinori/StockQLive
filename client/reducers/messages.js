import * as types from "../constants/action-types";
export default function messages (state = [], action) {
    switch (action.type) {
        case types.SEND_MESSAGE:
            return [
                ...state,
                action.message
            ];
        case types.APPEND_MESSAGES:
            return [
                ...state,
                ...action.messages
            ];
        case types.APPEND_MESSAGE:
            const {message} = action;
            let shouldAppend = true;
            state.every((existedMessage) => {
                shouldAppend = existedMessage._id !== message._id;
                return shouldAppend;
            });
            if (shouldAppend) {
                return [
                    ...state,
                    message
                ];
            }
            return state;
        default:
            return state;
    }
}
