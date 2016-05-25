import * as ActionType from "../../constants/action-types";
import { List } from "immutable";

const initialState = List();
export default function Subjects (state = initialState, action) {
    switch (action.type) {
        case ActionType.UPDATE_SUBJECTS:
            return List(action.subjects);
        default:
            return state;

    }
};
