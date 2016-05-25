import * as types from "../constants/action-types";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../shared/lib/fetch-utils"

export function initSubjects () {
    return function (dispatch, getState) {
        fetch("/api/subject", {
            Accept: "application/json"
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((subjects) => {
            dispatch({
                type: types.UPDATE_SUBJECTS,
                subjects: subjects
            });
        })
        .catch((error) => {
            console.log("initSubjects error", error);
        });
    };
}
