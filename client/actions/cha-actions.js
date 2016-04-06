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

export function signUpUser (toSignUpUser) {
    return function (dispatch, getState) {
        return fetch("/signup", {
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
        return fetch("/login", {
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


export function createChannel (channel) {
    return function (dispatch, getState) {
        return fetch("/channel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: true,
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((channel) => {
            console.log(channel);
        })
        .catch((error) => {
            console.error("create channel error", error);
        });
    };
}
