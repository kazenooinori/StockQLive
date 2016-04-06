import * as types from "../../constants/action-types";
export default function Channel (state = {_id: "", ownerUsername: "", name: "", chatroomId: ""}, action) {
    switch (action.type) {
        case types.UPDATE_CHANNEL:
            return Object.assign({}, action.channel);
        default:
            return state;
    }
}
