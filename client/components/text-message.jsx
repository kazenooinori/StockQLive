import React from "react";
var {PropTypes} = React;

export default class TextMessage extends React.Component {
    render () {
        const {senderId, content} = this.props.message;
        return (
            <div className="message text-message">
                <div className="head">
                    <div className="avatar">
                        <img src="/images/head.png"/>
                    </div>
                    <p className="name">
                        {senderId}
                    </p>
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        );
    }
}
TextMessage.propTypes = {
    message: PropTypes.object
};
TextMessage.defaultProps = {
    message: "",
};
