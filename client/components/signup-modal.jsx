import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from "./signup-form";

const {PropTypes} = React;

const SignUpModal = React.createClass({
    propTypes: {
        onSignUpUser: PropTypes.func,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.signupModal)).modal({
            blurring: true,
        });

        const {onSignUpUser} = this.props;
        $('.signup-form').form({
            onSuccess: function (event, submitObject) {
                event.preventDefault();

                onSignUpUser(submitObject);
            },
            fields: {
                username : 'empty',
                password : ['empty'],
            },
        });
    },
    render () {
        return (
            <div id="signup-modal" className="ui modal small" ref="signupModal">
                <i className="close icon"></i>
                <div className="header">
                    Modal Title
                </div>
                <div className="content">
                    <div className="description">
                        <SignUpForm/>
                    </div>
                </div>
            </div>
        );
    }
});

export default SignUpModal;
