import * as types from "../../constants/action-types";
import {Map} from "immutable";

const initialState = Map({
    _id: "",
    username: ""
});
export default function user (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return state.merge(action.user);
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
