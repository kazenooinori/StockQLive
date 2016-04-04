import * as types from "../constants/action-types";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../lib/fetch-utils";

export function sendMessage (message) {
    return {
        type: types.SEND_MESSAGE,
        message
    };
}

export function appendMessages (messages) {
    return {
        type: types.APPEND_MESSAGES,
        messages
    };
}

export function appendMessage (message) {
    return {
        type: types.APPEND_MESSAGE,
        message
    };
}

export function fetchMessages (chatroomId) {
    return function (dispatch, getState) {
        // should inform that the app is going to fetch messages
        //dispatch(requestMessages());
        return fetch("/chatroom/" + chatroomId + "/messages", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
            credentials: 'include',
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            dispatch(appendMessages(json));
        })
        .catch((error) => {
            console.error("error when fetching messages", error);
        });
    };
}


export function createRequest (request) {
    return function (dispatch, getState) {
        return fetch("/requests", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request: request
            }),
            credentials: 'include',
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            dispatch({
                type: types.APPEND_REQUEST,
                request: json,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    };
}


export function fetchAllRequests () {
    return function (dispatch, getState) {
        return fetch("/requests", {
            method: "GEt",
            headers: {
                "Accept": "application/json",
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            dispatch({
                type: types.APPEND_REQUESTS,
                requests: json,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    };
}

export function logInUser (user) {
    return {
        type: types.LOGIN,
        user,
    };
}
export function logOutUser (user) {
    return function(dispatch, getState) {
        return fetch("/logout", {
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
        return fetch("/user/me", {
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
