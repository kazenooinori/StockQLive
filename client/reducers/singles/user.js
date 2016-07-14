import * as types from "../../constants/action-types";
import {Map} from "immutable";

// const initialState = Map({
//     _id: "123456",
//     username: "123456",
//     displayName: "Dazlee",
//     photos: "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c8.0.80.80/p80x80/10153880_10202861108760535_1171467779_n.jpg?oh=4f01035bebe96f5502ef38b2d81d9727&oe=57EF3664",
// });
const initialState = Map({
    _id: "",
    username: "",
    displayName: "",
    photos: "",
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
