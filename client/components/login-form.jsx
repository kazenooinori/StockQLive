import React from "react";

const {Component, PropTypes} = React;

const LoginForm = React.createClass({
    render () {
        return (
            <form className="ui form login-form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="text" name="password" placeholder="Password"/>
                </div>
                <button className="ui button" onClick={this.onLogin}>Login</button>
            </form>
        );
    }
})

export default LoginForm;
