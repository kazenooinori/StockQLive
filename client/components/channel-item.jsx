import React from "react";

const {PropTypes} = React;

const ChannelItem = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired,
        chatroomId: PropTypes.string.isRequired,
    },
    render () {
        const {name, chatroomId} = this.props;
        return (
            <div className="channel-item item">
                <a className="content" href={"/chatroom/" + chatroomId}>
                    <div className="description clearfix">
                        <span className="name">#{name}</span>
                        <div className="ui horizontal label">
                            <i className="users icon"></i>25
                        </div>
                    </div>
                </a>
            </div>
        );
    }
});

export default ChannelItem;
