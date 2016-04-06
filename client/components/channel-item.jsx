import React from "react";

const {PropTypes} = React;

const ChannelItem = React.createClass({
    propTypes: {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        chatroomId: PropTypes.string.isRequired,
    },
    render () {
        const {_id, name, chatroomId} = this.props;
        return (
            <div className="channel-item item">
                <a className="content" href={"/channel/" + _id}>
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
