import React from "react";
import * as momentUtils from "../../shared/lib/moment-utils";

const {PropTypes} = React;

const TextMessage = React.createClass({
    propTypes: {
        message: PropTypes.object
    },
    render () {
        const {senderDisplayName, content, createdAt} = this.props.message;
        return (
            <div className="comment">
                <a className="avatar">
                    <img src={"/images/" + senderDisplayName + ".jpg"}/>
                </a>
                <div className="content">
                    <a className="author">{senderDisplayName}</a>
                    <div className="metadata">
                        <span className="date">{momentUtils.relativeDateTime(createdAt)}</span>
                    </div>
                    <div className="text">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
});

export default TextMessage;
