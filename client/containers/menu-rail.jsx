import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import LoggedInController from "../components/logged-in-controller";
import LoggingInController from "../components/logging-in-controller";
import ChannelItem from "../components/channel-item";

const {Component, PropTypes} = React;

const MenuRail = React.createClass({
    propTypes: {
        user: PropTypes.object,
        personalChannels: PropTypes.array.isRequired,
        publicChannels: PropTypes.array.isRequired,
        onLogOutUser: PropTypes.func.isRequired,
    },
    onClickLogin () {
        $("#login-modal").modal("show");
    },
    onClickSignUp () {
        $("#signup-modal").modal("show");
    },
    onClickCreateChannel () {
        $("#create-channel-modal").modal("show");
    },
    componentWillReceiveProps (nextProps) {
        if (this.props.user.get("_id") !== nextProps.user.get("_id")) {
            $("#login-modal").modal("hide");
            $("#signup-modal").modal("hide");
        }
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
    },
    renderLoginStatus () {
        const {user, onLogOutUser} = this.props;
        if (user.get("username")) {
            return (
                <LoggedInController
                    user={user}
                    onLogOutUser={onLogOutUser}/>
            );
        } else {
            return (
                <LoggingInController
                    onClickLogin={this.onClickLogin}
                    onClickSignUp={this.onClickSignUp}/>
            );
        }
    },
    renderTab () {
        return (
            <div className="ui secondary menu" ref="menu">
                <a className="item active" data-tab="channel">個人頻道</a>
                <a className="item" data-tab="market">公開</a>
                <a className="item" data-tab="news">新聞</a>
            </div>
        );
    },
    renderCreateChannel () {
        return (
            <button className="ui blue basic button" onClick={this.onClickCreateChannel}>新增頻道</button>
        );
    },
    renderChannels (channels) {
        return channels.map((channel) => {
            return (
                <ChannelItem key={channel._id} {...channel}/>
            );
        });
    },
    render () {
        const {personalChannels, publicChannels} = this.props;
        return (
            <div className="menu-rail">
                <a className="logo">
                    <img src="/images/logo.png"/>
                </a>
                {this.renderLoginStatus()}
                {this.renderTab()}
                <div className="ui tab segment board active" data-tab="channel">
                    {this.renderCreateChannel()}
                    <div className="channel-list ui middle aligned selection list">
                        {this.renderChannels(personalChannels)}
                    </div>
                </div>
                <div className="ui tab segment board" data-tab="market">
                    <div className="channel-list ui middle aligned selection list">
                        {this.renderChannels(publicChannels)}
                    </div>
                </div>
                <div className="ui tab segment board" data-tab="news">
                    新聞放在這
                </div>
            </div>
        );
    }
});

const mapStateToProps = function (state) {
    return {
        personalChannels: state.channels.filter((channel) => channel.type === "personal"),
        publicChannels: state.channels.filter((channel) => channel.type === "public"),
        user: state.user,
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        onLogOutUser: function () {
            dispatch(ChaActions.logOutUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuRail);
