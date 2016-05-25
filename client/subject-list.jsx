import React from "react";
import ReactDOM from "react-dom";
import SubjectList from "./containers/subject-list.jsx";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers/subject-list";

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(thunkMiddleWare, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <SubjectList />
    </Provider>,
    document.getElementById("main")
);
