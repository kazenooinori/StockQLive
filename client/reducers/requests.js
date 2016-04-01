import * as types from "../constants/action-types";
export default function requests (state = [], action) {
    switch(action.type) {
        case types.APPEND_REQUESTS:
            return [
                ...state,
                ...action.requests
            ];
        case types.APPEND_REQUEST:
            return [
                ...state,
                action.request
            ];
        default:
            return state;
    }
}
