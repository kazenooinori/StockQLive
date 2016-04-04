import * as types from "../../constants/action-types";

export default function user (state = {_id: "",username: ""}, action) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, action.user);
        case types.LOGOUT:
            return {
                _id: "",
                username: "",
            };
        default:
            return state;
    }
}
