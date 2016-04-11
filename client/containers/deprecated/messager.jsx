import React from "react";
import TextMessage from "../components/text-message.jsx";
import InformationRail from "./information-rail";
import MenuRail from "./menu-rail";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import CreateChannelModal from "../components/create-channel-modal";
import {connect} from "react-redux";
import * as ChaActions from '../actions/cha-actions';

const {Component, PropTypes} = React;

class Messager extends Component {
    constructor(props) {
        super(props);
        var {props} = this;
        props.socket.on("server push", function (data) {
            if (data.chatroomId && data.chatroomId === props.channel.chatroomId) {
                props.onAppendMessage(data);
            }
        });

        this.state = {
            text: "",
        };
    }
    handleSubmitMessage (e) {
        e.preventDefault();
        const {user} = this.props;
        const {text} = this.state;
        this.props.socket.emit('client send', {
            senderId: user._id,
            senderUsername: user.username,
            chatroomId: this.props.chatroomId,
            content: text,
        });
        this.setState({
            text: ""
        });
    }
    handleInputText (e) {
        this.setState({
            text: e.target.value
        });
    }
    componentDidMount() {
        // initialize messages
        const {onFetchMessages, onFetchChannels, chatroomId, onInitUser} = this.props;
        onInitUser();
        onFetchChannels();
        onFetchMessages(chatroomId);

        $('.ui.sticky.messager-header').sticky({
            context: '#message-box'
        });
    }
    componentDidUpdate() {
        const {messageBox, messageList} = this.refs;
        messageBox.scrollTop = messageList.offsetHeight;
    }
    renderTextMessage (messages) {
        return messages.map((message, index) => (<TextMessage key={index} message={message}/>));
    }
    renderMessageInputArea (user) {
        if (user.username) {
            return (
                <form onSubmit={this.handleSubmitMessage.bind(this)}>
                    <div className="ui input">
                        <input ref="textInput" type="text" placeholder="說說話" onInput={this.handleInputText.bind(this)} value={this.state.text}/>
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
    }
    render () {
        const {messages, onLogInUser, onSignUpUser, onCreateChannel, user, channel} = this.props;
        return (
            <div className="messager">
                <MenuRail/>
                <div className="main-messager">
                    <div id="message-box" className="message-box" ref="messageBox">
                        <h3 className="ui dividing header messager-header sticky" style={{paddingTop: "10px"}}>{channel.name}</h3>
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
                <InformationRail/>
                <LoginModal
                    onLogInUser={onLogInUser}/>
                <SignUpModal
                    onSignUpUser={onSignUpUser}/>
                <CreateChannelModal
                    onCreateChannel={onCreateChannel}/>
            </div>
        );
    }
}
Messager.propTypes = {
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
    chatroomId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    onInitUser: PropTypes.func.isRequired,
    onFetchChannels: PropTypes.func.isRequired,
    onLogInUser: PropTypes.func.isRequired,
    onSignUpUser: PropTypes.func.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    onFetchMessages: PropTypes.func.isRequired,
    onAppendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
    return {
        user: state.user,
        messages: state.messages,
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
        onSendMessage: function (message) {
            dispatch(ChaActions.sendMessage(message));
        },
        onFetchMessages: function (chatroomId) {
            dispatch(ChaActions.fetchMessages(chatroomId));
        },
        onFetchChannels: function () {
            dispatch(ChaActions.fetchChannels());
        },
        onAppendMessage: function (message) {
            dispatch(ChaActions.appendMessage(message));
        },
        onCreateChannel: function (channel) {
            dispatch(ChaActions.createChannel(channel));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messager);
