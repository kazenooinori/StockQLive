import React from "react";
import ReactDOM from "react-dom";
import RequestList from "./containers/request-list";
import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers/request-list.js";
import thunkMiddleWare from "redux-thunk";
import createLogger from "redux-logger";
import {Provider} from "react-redux";

const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <RequestList/>
    </Provider>,
    document.getElementById("main")
);
