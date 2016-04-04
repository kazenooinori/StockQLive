import React from "react";

const SignUpForm = React.createClass({
    render () {
        return (
            <form className="ui form signup-form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="text" name="password" placeholder="Password"/>
                </div>
                <button className="ui button">Signup</button>
            </form>
        );
    }
});

export default SignUpForm;
