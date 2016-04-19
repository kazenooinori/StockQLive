import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

import InformationRail from "./information-rail";
import MenuRail from "./menu-rail";
import Messager from "./messager";

import TextMessage from "../components/text-message.jsx";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import StockChart from "../components/stock-chart";
import CreateChannelModal from "../components/create-channel-modal";
import StockItem from "../components/stock-item";

import * as ChaActions from '../actions/cha-actions';
import * as AuthActions from '../actions/auth-actions';


const {Component, PropTypes} = React;
const checkLatestPrice = (stock) => stock.latest_price !== -1;
const Liveroom = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
        channel: PropTypes.object,
        socket: PropTypes.object.isRequired,
        onInitUser: PropTypes.func.isRequired,
        onFetchChannels: PropTypes.func.isRequired,
        onLogInUser: PropTypes.func.isRequired,
        onSignUpUser: PropTypes.func.isRequired,
    },
    componentDidMount() {
        // initialize messages
        const {onFetchChannels, onInitUser, onFetchStockSeries} = this.props;
        onInitUser();
        onFetchChannels();
        onFetchStockSeries(["0050"]);

        this.props.updateStocks();
    },
    renderStockItems (stocks) {
        return stocks.filter(checkLatestPrice).map((stock) => {
            return (
                <StockItem
                    key={stock.number}
                    name={stock.name}
                    latestPrice={stock.latest_price}
                    yesterdayPrice={stock.yesterday_price}/>
            );
        });
    },
    render () {
        const {
            onLogInUser,
            onSignUpUser,
            onCreateChannel,
            channel,
            socket,
            stocks,
            stockSeries,
        } = this.props;
        return (
            <div className="liveroom">
                <div className="left_col">
                    <MenuRail/>
                </div>
                <div className="main_col">
                    <h1 className="ui dividing header">
                        {channel.get("name")}
                    </h1>
                    <Messager
                        channel={channel}
                        socket={socket}/>
                    <div className="tail">
                        <StockChart
                            stockSeries={stockSeries}/>
                        <div className="ui tab segment board active">
                            <div className="stock-list ui middle aligned selection list">
                                {this.renderStockItems(stocks)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right_col">
                    <Messager
                        channel={channel}
                        socket={socket}/>
                </div>

                <LoginModal
                    onLogInUser={onLogInUser}/>
                <SignUpModal
                    onSignUpUser={onSignUpUser}/>
                <CreateChannelModal
                    onCreateChannel={onCreateChannel}/>
            </div>
        );
    },
});

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
            dispatch(ChaActions.updateStocks());
        },
        onFetchStockSeries: function (series) {
            dispatch(ChaActions.fetchStockSeries(series));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Liveroom);
