import * as types from "../../constants/action-types";
export default function Channels (state = [], action) {
    switch (action.type) {
        case types.APPEND_CHANNELS:
            return [
                ...state,
                ...action.channels,
            ];
        case types.APPEND_CHANNEL:
            return [
                ...state,
                action.channel,
            ];
        default:
            return state;
    }
}
