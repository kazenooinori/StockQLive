import * as types from "../../constants/action-types";
import {List} from "immutable";

const initialState = List();
export default function Channels (state = initialState, action) {
    switch (action.type) {
        case types.APPEND_CHANNELS:
            return state.concat(action.channels);
        case types.APPEND_CHANNEL:
            return state.push(action.channel);
        default:
            return state;
    }
}
