import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import LoginForm from "../components/login-form";
import fetch from "isomorphic-fetch";
import * as fetchUtils from "../../lib/fetch-utils.js";

const {Component, PropTypes} = React;

const LoginModal = React.createClass({
    propTypes: {
        onLogInUser: PropTypes.func,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.loginModal)).modal({
            onApprove: function (element) {
                console.log("going login");
            },
            onHidden: function () {
                console.log("close");
            },
            blurring: true,
        });

        const {onLogInUser} = this.props;
        $('.login-form').form({
            onSuccess: function (event, submitObject) {
                event.preventDefault();

                fetch("/login", {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submitObject),
                    credentials: 'include',
                })
                .then(fetchUtils.checkStatus)
                .then(fetchUtils.parseJSON)
                .then((user) => {
                    onLogInUser(user);

                    $("#login-modal").modal("hide");
                })
                .catch((error) => {
                    console.error("login fail", error);
                });
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
