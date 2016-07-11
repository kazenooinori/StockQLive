import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import configureStore from "./lib/configure-store";
import App from "./containers/app.jsx";
import BotChannel from "./containers/bot-channel.jsx";
import PublicChannel from "./containers/public-channel.jsx";

const socket = io("/chat");
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={BotChannel}/>
                <Route path="public" component={PublicChannel}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("main")
);
