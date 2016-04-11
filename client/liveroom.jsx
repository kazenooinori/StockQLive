import React from "react";
import ReactDOM from "react-dom";
import Messager from "./containers/messager.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers/chatroom";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
import Liveroom from "./containers/liveroom";

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

// this comes from socket.io package
const socket = io("/chat");

const container = document.getElementById("main");
const channelId = container.dataset.channelId;
const chatroomId = container.dataset.chatroomId;
const channelName = container.dataset.channelName;
const ownerUsername = container.dataset.ownerUsername;
const channel = {
    _id: channelId,
    name: channelName,
    ownerUsername: ownerUsername,
    chatroomId: chatroomId,
};

ReactDOM.render(
    <Provider store={store}>
        <Liveroom
            channel={channel}
            socket={socket}/>
    </Provider>,
    container
);
