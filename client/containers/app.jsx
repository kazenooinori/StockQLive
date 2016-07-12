import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import MenuSidebar from "./menu-sidebar.jsx";
import TrendingBar from "./trending-bar.jsx";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import * as AuthActions from '../actions/auth-actions';

const App = React.createClass({
    mixins: [PureRenderMixin],
    render () {
        const { logInUser, signUpUser } = this.props;
        const channel = this.props.location.pathname.slice(1);
        return (
            <div className="app">
                <div className="left-col">
                    <MenuSidebar
                        channel={channel || "public"}/>
                </div>
                <div className="top-head">
                    <TrendingBar/>
                </div>
                <div className="full-col">
                    {this.props.children}
                </div>
                <LoginModal
                    onLogInUser={logInUser}/>
                <SignUpModal
                    onSignUpUser={signUpUser}/>
            </div>
        );
    },
});

const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, AuthActions)(App);
