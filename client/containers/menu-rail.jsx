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
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        channels: PropTypes.array.isRequired,
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
        if (this.props.user._id !== nextProps.user._id) {
            $("#login-modal").modal("hide");
            $("#signup-modal").modal("hide");
        }
    },
    renderLoginStatus () {
        const {user, onLogOutUser} = this.props;
        if (user.username) {
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
        const {channels} = this.props;
        return (
            <div className="menu-rail">
                <a className="logo">
                    <img src="/images/logo.png"/>
                </a>
                {this.renderLoginStatus()}
                <div className="ui tab segment board active">
                    {this.renderCreateChannel()}
                    <div className="channel-list ui middle aligned selection list">
                        {this.renderChannels(channels)}
                    </div>
                </div>
            </div>
        );
    }
});

const mapStateToProps = function (state) {
    return {
        channels: state.channels,
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
