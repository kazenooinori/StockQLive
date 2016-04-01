import * as types from "../constants/action-types";
import fatch from "isomorphic-fetch";

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
        return fetch("/chatroom/" + chatroomId + "/messages")
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
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request: request
            }),
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
            method: "get",
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
