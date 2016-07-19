import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import TextMessage from "../components/text-message.jsx";
import Message from "../components/message.jsx";
import StockCard from "../components/stock-card.jsx";
import ArticleList from "../components/article-list.jsx";
import * as ChaActions from '../actions/cha-actions';

const { PropTypes } = React;

var usdeur = [
/* Jul 2009 */
[1248134400000,21.64],
[1248220800000,22.39],
[1248307200000,22.55],
[1248393600000,22.86],
[1248652800000,22.87],
[1248739200000,22.86],
[1248825600000,22.86],
[1248912000000,23.26],
[1248998400000,23.34],
/* Aug 2009 */
[1249257600000,23.78],
[1249344000000,23.65],
[1249430400000,23.59],
[1249516800000,23.42],
[1249603200000,23.64],
[1249862400000,23.53],
[1249948800000,23.26],
[1250035200000,23.62],
[1250121600000,24.06],
[1250208000000,23.83],
[1250467200000,22.80],
[1250553600000,23.43],
[1250640000000,23.51],
[1250726400000,23.76],
[1250812800000,24.17],
[1251072000000,24.15],
[1251158400000,24.20],
[1251244800000,23.92],
[1251331200000,24.21],
[1251417600000,24.29],
[1251676800000,24.03]];

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
        messages = [
            {type: 'stock', content: {number: '3520', data: usdeur}}, 
            {type: 'article', content: 
                [
                    {url: '#', img: 'http://twimg.edgesuite.net/images/ReNews/20160719/420_fb906d338c2c022934e84c45f4c949f6.jpg', title: '自撞起火的遊覽車　車齡6年曾有5次違規紀錄'},
                    {url: '#', img: 'http://twimg.edgesuite.net/images/ReNews/20160719/640_986c1633e14b7857b6e7dac14700e931.jpg', title: '一銀案北市警立功　柯P：台北市有你們真好'},
                    {url: '#', img: 'http://twimg.edgesuite.net/images/twapple/640pix/20160719/LN01/LN01_001.jpg', title: '【一銀破案】台警7天抓人追回贓款　歐美各國要取經'}
                ]}
        ];
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
                case 'article':
                    return (
                        <Message key={index} message={message}>
                            <ArticleList articles={message.content}/>
                        </Message>
                    );
            }
        });
    },
    renderMessageInputArea (user) {
        if (user.get("_id")) {
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
