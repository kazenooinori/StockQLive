import React from "react";
import ReactDOM from "react-dom";

const {PropTypes} = React;

const CreateChannelModal = React.createClass({
    propTypes: {
        onCreateChannel: PropTypes.func,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.createChannelModal)).modal({
            blurring: true,
        });

        const {onCreateChannel} = this.props;
        $('.create-channel-form').form({
            onSuccess: function (event, submitObject) {
                event.preventDefault();

                onCreateChannel(submitObject);
            },
            fields: {
                channel : 'empty',
                channelOwner : ['empty'],
            },
        });
    },
    render () {
        return (
            <div id="create-channel-modal" className="ui modal small" ref="createChannelModal">
                <i className="close icon"></i>
                <div className="header">
                    新增頻道
                </div>
                <div className="content">
                    <div className="description">
                        <form className="ui form create-channel-form">
                            <div className="field">
                                <label>頻道名稱</label>
                                <input type="text" name="name" placeholder="頻道名稱"/>
                            </div>
                            <div className="field">
                                <label>頻道主</label>
                                <input type="text" name="ownerUsername" placeholder="頻道主"/>
                            </div>
                            <button className="ui button">新增</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default CreateChannelModal;
