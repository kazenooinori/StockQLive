import React from "react";
import TextMessage from "../components/text-message.jsx";
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
        const {userId} = this.props;
        const {text} = this.state;
        this.props.socket.emit('client send', {
            senderId: userId,
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
        const {onFetchMessage, chatroomId} = this.props;
        onFetchMessage(chatroomId);
    }
    componentDidUpdate() {
        const {messageBox, messageList} = this.refs;
        messageBox.scrollTop = messageList.offsetHeight;
    }
    renderTextMessage (messages) {
        return messages.map((message, index) => (<TextMessage key={index} message={message}/>));
    }
    render () {
        const {messages, onFetchMessage} = this.props;
        return (
            <div className="messager">
                <div className="message-box" ref="messageBox">
                    <div className="message-list" ref="messageList">
                        {this.renderTextMessage(messages)}
                    </div>
                </div>
                <div className="message-input-area input-group">
                    <form onSubmit={this.handleSubmitMessage.bind(this)}>
                        <input ref="textInput" type="text" className="message-input-box form-control" onInput={this.handleInputText.bind(this)} value={this.state.text}/>
                    </form>
                    <div className="input-group-btn">
                        <a className="send-button btn btn-default">送出</a>
                    </div>
                </div>
            </div>
        );
    }
}
Messager.propTypes = {
    userId: PropTypes.string.isRequired,
    chatroomId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    onFetchMessage: PropTypes.func.isRequired,
    onAppendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
    return {
        messages: state.messages
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
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
