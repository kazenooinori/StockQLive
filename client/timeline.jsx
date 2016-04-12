import React from "react";
import ReactDOM from "react-dom";
import Timeline from "./containers/timeline";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
// import rootReducer from "./reducers/receptionist";

// const loggerMiddleware = createLogger();
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
        <Timeline/>,
    document.getElementById("main")
);
