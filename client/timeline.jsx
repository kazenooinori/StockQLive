import React from "react";
import ReactDOM from "react-dom";
import Timeline from "./containers/timeline";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
// TODO should change to timeline reducer
import rootReducer from "./reducers/chatroom";

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Timeline/>
    </Provider>,
    document.getElementById("main")
);
