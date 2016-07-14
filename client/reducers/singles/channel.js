import * as types from "../../constants/action-types";
import {Map} from "immutable";

const initialState = Map({
    _id: "",
    ownerUsername: "",
    name: "",
    chatroomId: ""
});
export default function Channel (state = initialState, action) {
    switch (action.type) {
        case types.SET_CHANNEL:
            return state.merge(action.channel);
        default:
            return state;
    }
}
