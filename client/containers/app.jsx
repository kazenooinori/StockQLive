import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

import InformationRail from "./information-rail.jsx";
import MenuRail from "./menu-rail.jsx";
import Messager from "./messager.jsx";

import TextMessage from "../components/text-message.jsx";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import StockChart from "../components/stock-chart";
import CreateChannelModal from "../components/create-channel-modal";
import StockItem from "../components/stock-item";

import * as ChaActions from '../actions/cha-actions';
import * as AuthActions from '../actions/auth-actions';
import * as StockActions from '../actions/stock-actions';


const {Component, PropTypes} = React;
const checkLatestPrice = (stock) => stock.latest_price !== -1;
const App = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
        // socket: PropTypes.object.isRequired,
        // onInitUser: PropTypes.func.isRequired,
        // onFetchChannels: PropTypes.func.isRequired,
        // onLogInUser: PropTypes.func.isRequired,
        // onSignUpUser: PropTypes.func.isRequired,
    },
    componentDidMount() {
        // initialize messages
        // const {onFetchChannels, onInitUser, onFetchStockSeries} = this.props;
        // onInitUser();
        // onFetchChannels();
        // onFetchStockSeries(["0050"]);

        // this.props.updateStocks();
    },
    render () {
        return (
            <div className="liveroom">
                <div className="left_col">
                    <MenuRail/>
                </div>
                <div className="main_col">
                    <h1 className="ui dividing header">
                        大盤
                    </h1>
                    {this.props.children}
                </div>


            </div>
        );
    },
});
/*
<LoginModal
    onLogInUser={onLogInUser}/>
<SignUpModal
    onSignUpUser={onSignUpUser}/>
 */
const mapStateToProps = function (state) {
    return {
        user: state.user,
        stocks: state.stocks,
        stockSeries: state.stockSeries,
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        onInitUser: function () {
            dispatch(AuthActions.initUser());
        },
        onLogInUser: function (user) {
            dispatch(AuthActions.logInUser(user));
        },
        onSignUpUser: function (user) {
            dispatch(AuthActions.signUpUser(user));
        },
        onFetchChannels: function () {
            dispatch(ChaActions.fetchChannels());
        },
        onCreateChannel: function (channel) {
            dispatch(ChaActions.createChannel(channel));
        },
        updateStocks: function () {
            dispatch(StockActions.updateStocks());
        },
        onFetchStockSeries: function (series) {
            dispatch(StockActions.fetchStockSeries(series));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
