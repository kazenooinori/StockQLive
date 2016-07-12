import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import createLogger from 'redux-logger'
import reducer from "../reducers/app";

const configureStore = () => {
    var middlewares = [thunkMiddleWare];

    if (process.env.NODE_ENV !== "production") {
        middlewares.push(createLogger());
    }

    return createStore(reducer, applyMiddleware(...middlewares));
};

export default configureStore;
