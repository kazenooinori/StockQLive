import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./login-form";

const {PropTypes} = React;

const LoginModal = React.createClass({
    propTypes: {
        onLogInUser: PropTypes.func,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.loginModal)).modal({
            blurring: true,
        });

        const {onLogInUser} = this.props;
        $('.login-form').form({
            onSuccess: function (event, submitObject) {
                event.preventDefault();

                onLogInUser(submitObject);
            },
            fields: {
                username : 'empty',
                password : ['empty'],
            },
        });
    },
    render () {
        return (
            <div id="login-modal" className="ui modal small" ref="loginModal">
                <i className="close icon"></i>
                <div className="header">
                    Modal Title
                </div>
                <div className="content">
                    <div className="description">
                        <LoginForm/>
                    </div>
                </div>
            </div>
        );
    }
});

export default LoginModal;
