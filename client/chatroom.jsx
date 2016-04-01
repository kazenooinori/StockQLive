import React from "react";
import ReactDOM from "react-dom";
import Messager from "./containers/messager.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers/chatroom";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

// this comes from socket.io package
const socket = io("/chat");

let paths = location.pathname.split('/');
let chatroomId = paths[paths.length - 1];

ReactDOM.render(
    <Provider store={store}>
        <Messager
            userId={Math.floor(Math.random() * 10000000).toString()}
            chatroomId={chatroomId}
            socket={socket}/>
    </Provider>,
    document.getElementById("main")
);
