import React from "react";
import ReactDOM from "react-dom";
import Timeline from "./containers/timeline";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
import timelineReducer from "./reducers/timeline";

const loggerMiddleware = createLogger();
const store = createStore(timelineReducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Timeline/>
    </Provider>,
    document.getElementById("main")
);
