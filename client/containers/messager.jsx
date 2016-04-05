import React from "react";
import TextMessage from "../components/text-message.jsx";
import InformationRail from "./information-rail";
import MenuRail from "./menu-rail";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import {connect} from "react-redux";
import * as ChaActions from '../actions/cha-actions';

const {Component, PropTypes} = React;

class Messager extends Component {
    constructor(props) {
        super(props);
        var self = this;
        this.props.socket.on("server push", function (data) {
            self.props.onAppendMessage(data);
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
        const {onFetchMessage, chatroomId, onInitUser} = this.props;
        onFetchMessage(chatroomId);
        onInitUser();
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
        const {messages, onFetchMessage, onLogInUser, onSignUpUser, user} = this.props;
        return (
            <div className="messager">
                <MenuRail/>
                <div className="main-messager">
                    <div className="message-box" ref="messageBox">
                        <div className="message-list" ref="messageList">
                            {this.renderTextMessage(messages)}
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
            </div>
        );
    }
}
Messager.propTypes = {
    userId: PropTypes.string.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }),
    chatroomId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    onInitUser: PropTypes.func.isRequired,
    onLogInUser: PropTypes.func.isRequired,
    onSignUpUser: PropTypes.func.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    onFetchMessage: PropTypes.func.isRequired,
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
        onFetchMessage: function (chatroomId) {
            dispatch(ChaActions.fetchMessages(chatroomId));
        },
        onAppendMessage: function (message) {
            dispatch(ChaActions.appendMessage(message));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messager);
