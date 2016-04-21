import * as types from "../constants/action-types";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../shared/lib/fetch-utils";

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
        return fetch("/api/chatroom/" + chatroomId + "/messages", {
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


export function createChannel (channel) {
    return function (dispatch, getState) {
        return fetch("/api/channel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(channel),
            credentials: true,
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((channel) => {
            dispatch({
                type: types.APPEND_CHANNEL,
                channel,
            });
        })
        .catch((error) => {
            console.error("create channel error", error);
        });
    };
}
export function fetchChannels () {
    return function (dispatch, getState) {
        return fetch("/api/channel", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: true,
        })
        .then(fetchUtils.checkStatus)
        .then(fetchUtils.parseJSON)
        .then((channels) => {
            dispatch({
                type: types.APPEND_CHANNELS,
                channels,
            });
        })
        .catch((error) => {
            console.error("create channel error", error);
        });
    };
}
