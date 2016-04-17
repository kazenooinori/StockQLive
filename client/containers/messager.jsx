import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

import TextMessage from "../components/text-message.jsx";

import * as ChaActions from '../actions/cha-actions';

const {Component, PropTypes} = React;

const Messager = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
        channel: PropTypes.object,
        messages: PropTypes.array.isRequired,
        onSendMessage: PropTypes.func.isRequired,
        onFetchMessages: PropTypes.func.isRequired,
        onAppendMessage: PropTypes.func.isRequired,
    },
    getInitialState () {
        return {
            text: "",
        };
    },
    handleSubmitMessage (e) {
        e.preventDefault();
        const {user, channel} = this.props;
        const {text} = this.state;
        this.props.socket.emit('client send', {
            senderId: user.get("_id"),
            senderUsername: user.get("username"),
            chatroomId: channel.get("chatroomId"),
            content: text,
        });
        this.setState({
            text: ""
        });
    },
    handleInputText (e) {
        this.setState({
            text: e.target.value
        });
    },
    componentDidMount() {
        // initialize messages
        const {onFetchMessages, socket, onAppendMessage, channel} = this.props;
        onFetchMessages(channel.get("chatroomId"));

        socket.on("server push", function (data) {
            if (data.chatroomId && data.chatroomId === channel.get("chatroomId")) {
                onAppendMessage(data);
            }
        });
    },
    componentDidUpdate() {
        const {messageBox, messageList} = this.refs;
        messageBox.scrollTop = messageList.offsetHeight;
    },
    renderTextMessage (messages) {
        return messages.map((message, index) => (<TextMessage key={index} message={message}/>));
    },
    renderMessageInputArea (user) {
        if (user.get("username")) {
            return (
                <form onSubmit={this.handleSubmitMessage}>
                    <div className="ui input">
                        <input ref="textInput" type="text" placeholder="說說話" onInput={this.handleInputText} value={this.state.text}/>
                    </div>
                </form>
            );
        } else {
            return (
                <div className="ui input">
                    <input ref="textInput" type="text" placeholder="請先登入" disabled/>
                </div>
            )
        }
    },
    render () {
        const {messages, onLogInUser, onSignUpUser, onCreateChannel, user, channel} = this.props;
        return (
            <div className="messager">
                <div id="message-box" className="message-box" ref="messageBox">
                    <div className="ui comments">
                        <div className="message-list" ref="messageList">
                            {this.renderTextMessage(messages)}
                        </div>
                    </div>
                </div>
                <div className="message-input-area">
                    {this.renderMessageInputArea(user)}
                </div>
            </div>
        );
    }
});
/*
<h3 className="ui dividing header messager-header sticky" style={{paddingTop: "10px"}}>{channel.name}</h3>
 */
const mapStateToProps = function (state) {
    return {
        user: state.user,
        messages: state.messages,
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        onSendMessage: function (message) {
            dispatch(ChaActions.sendMessage(message));
        },
        onFetchMessages: function (chatroomId) {
            dispatch(ChaActions.fetchMessages(chatroomId));
        },
        onAppendMessage: function (message) {
            dispatch(ChaActions.appendMessage(message));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messager);
