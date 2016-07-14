import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import TextMessage from "../components/text-message.jsx";
import Message from "../components/message.jsx";
import StockCard from "../components/stock-card.jsx";
import * as ChaActions from '../actions/cha-actions';

const { PropTypes } = React;

const Messager = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState () {
        return {
            text: "",
        };
    },
    handleSubmitMessage (e) {
        e.preventDefault();
        const { user, channel } = this.props;
        const { text } = this.state;
        this.props.socket.emit('client send', {
            senderId: user.get("_id"),
            senderDisplayName: user.get("displayName"),
            senderPhoto: user.get("photos"),
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
        const { socket } = this.props;
        socket.on("server push", (data) => {
            const {appendMessage, channel} = this.props;

            if (data.chatroomId && data.chatroomId === channel.get("chatroomId")) {
                appendMessage(data);
            }
        });
    },
    componentWillUpdate(nextProps) {
        if (nextProps.channel !== this.props.channel) {
            this.props.fetchMessages(nextProps.channel.get("chatroomId"));
        }
    },
    componentDidUpdate() {
        const { messageBox, messageList } = this.refs;
        messageBox.scrollTop = messageList.offsetHeight;
    },
    renderMessage (messages) {
        return messages.map((message, index) => {
            switch (message.type) {
                case 'text':
                    return (
                        <Message key={index} message={message}>
                            {message.content}
                        </Message>
                    );
                case 'stock':
                    return (
                        <Message key={index} message={message}>
                            <StockCard stock={message.content}/>
                        </Message>
                    );
            }
        });
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
        const { messages, user } = this.props;
        return (
            <div className="messager">
                <div id="message-box" className="message-box" ref="messageBox">
                    <div className="ui comments">
                        <div className="message-list" ref="messageList">
                            {this.renderMessage(messages)}
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

const mapStateToProps = function (state) {
    return {
        user: state.user,
        channel: state.channel,
        messages: state.messages,
        socket: state.socket,
    };
}

export default connect(mapStateToProps, ChaActions)(Messager);
