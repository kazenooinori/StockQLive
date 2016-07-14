import * as types from "../constants/action-types";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../shared/lib/fetch-utils";

export function signUpUser (toSignUpUser) {
    return function (dispatch, getState) {
        return fetch("/api/signup", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toSignUpUser),
            credentials: 'include',
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((user) => {
            dispatch({
                type: types.LOGIN,
                user,
            });
        })
        .catch((error) => {
            console.error("signup fail", error);
        });
    };
}
export function logInUser (toLogInUser) {
    return function(dispatch, getState) {
        return fetch("/api/login", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(toLogInUser),
            credentials: 'include',
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((user) => {
            dispatch({
                type: types.LOGIN,
                user,
            });
        })
        .catch((error) => {
            console.error("login fail", error);
        });
    };
}
export function logOutUser (user) {
    return function(dispatch, getState) {
        return fetch("/api/logout", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
            credentials: 'include',
        })
        .then(fetchUtils.checkStatus)
        .then(() => {
            dispatch({
                type: types.LOGOUT,
            });
        })
        .catch((error) => {
            console.error("logout user error", error);
        });
    };
}
export function initUser () {
    return function(dispatch, getState) {
        return fetch("/api/user/me", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
            credentials: 'include',
        })
        .then(fetchUtils.checkStatus)
        .then((response) => {
            return response.json();
        })
        .then((user) => {
            dispatch({
                type: types.LOGIN,
                user,
            });
        })
        .catch((error) => {
            console.error("fetch user error", error);
        });
    };
}
