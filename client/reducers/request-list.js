import * as types from "../actions/cha-actions.js";
import {combineReducers} from "redux";
import requests from "./requests";

const rootReducer = combineReducers({
    requests,
});

export default rootReducer;
