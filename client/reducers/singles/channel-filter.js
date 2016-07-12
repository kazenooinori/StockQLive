import * as types from "../../constants/action-types";
import { Map } from "immutable";

const initialState = "public";
export default function Channel (state = initialState, action) {
    switch (action.type) {
        case "public":
            return state.merge(action.channel);
        default:
            return state;
    }
}
