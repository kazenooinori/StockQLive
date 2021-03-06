import React from "react";

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
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <button className="ui button">Login</button>
            </form>
        );
    }
})

export default LoginForm;
