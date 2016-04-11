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
    },
    render () {
        const {onLogInUser, onSignUpUser, onCreateChannel, channel, socket} = this.props;
        return (
            <div className="messager">
                <MenuRail/>
                <Messager
                    channel={channel}
                    socket={socket}/>
                <InformationRail/>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Liveroom);
