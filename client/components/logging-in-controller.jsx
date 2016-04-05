import React from "react";

const {PropTypes} = React;

const LoggingInController = React.createClass({
    propTypes: {
        onClickLogin: PropTypes.func,
        onClickSignUp: PropTypes.func,
    },
    render () {
        const {onClickLogin, onClickSignUp} = this.props;
        return (
            <div className="login">
                <div className="button-groups">
                    <button className="ui primary button" onClick={onClickLogin}>
                        login
                    </button>
                    <button className="ui green button" onClick={onClickSignUp}>
                        signup
                    </button>
                </div>
            </div>
        );
    }
});

export default LoggingInController;
