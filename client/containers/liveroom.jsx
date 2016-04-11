import React from "react";
import TextMessage from "../components/text-message.jsx";
import InformationRail from "./information-rail";
import MenuRail from "./menu-rail";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import Messager from "./messager";
import CreateChannelModal from "../components/create-channel-modal";
import {connect} from "react-redux";
import * as ChaActions from '../actions/cha-actions';

const {Component, PropTypes} = React;

const checkLatestPrice = (stock) => stock.latest_price !== -1;
import StockItem from "../components/stock-item";

const Liveroom = React.createClass({
    propTypes: {
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        channel: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            ownerUsername: PropTypes.string.isRequired,
            chatroomId: PropTypes.string.isRequired,
        }),
        socket: PropTypes.object.isRequired,
        onInitUser: PropTypes.func.isRequired,
        onFetchChannels: PropTypes.func.isRequired,
        onLogInUser: PropTypes.func.isRequired,
        onSignUpUser: PropTypes.func.isRequired,
    },
    componentDidMount() {
        // initialize messages
        const {onFetchChannels, onInitUser} = this.props;
        onInitUser();
        onFetchChannels();

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
        } = this.props;
        return (
            <div className="liveroom">
                <div className="left_col">
                    <MenuRail/>
                </div>
                <div className="main_col">
                    <Messager
                        channel={channel}
                        socket={socket}/>
                    <div className="tail">
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
/*


 */

const mapStateToProps = function (state) {
    return {
        user: state.user,
        stocks: state.stocks,
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        onInitUser: function () {
            dispatch(ChaActions.initUser());
        },
        onLogInUser: function (user) {
            dispatch(ChaActions.logInUser(user));
        },
        onSignUpUser: function (user) {
            dispatch(ChaActions.signUpUser(user));
        },
        onFetchChannels: function () {
            dispatch(ChaActions.fetchChannels());
        },
        onCreateChannel: function (channel) {
            dispatch(ChaActions.createChannel(channel));
        },
        updateStocks: () => {
            dispatch(ChaActions.updateStocks());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Liveroom);
