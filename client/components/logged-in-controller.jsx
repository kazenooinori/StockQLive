import React from "react";

const {PropTypes} = React;

const LoggedInController = React.createClass({
    propTypes: {
        user: PropTypes.shape({
            _id: PropTypes.string,
            username: PropTypes.string,
        }),
        onLogOutUser: PropTypes.func,
    },
    render () {
        const {user, onLogOutUser} = this.props;
        return (
            <div className="login">
                {user.username}
                <div className="button-groups">
                    <button className="ui yellow button" onClick={onLogOutUser}>
                        logout
                    </button>
                </div>
            </div>
        );
    }
});

export default LoggedInController;
