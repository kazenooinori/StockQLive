import React from "react";
import ReactDOM from "react-dom";
import Receptionist from "./containers/receptionist.jsx"

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
import rootReducer from "./reducers/receptionist";

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Receptionist
            userId={Math.floor(Math.random() * 10000000).toString()}/>
    </Provider>,
    document.getElementById("main")
);
