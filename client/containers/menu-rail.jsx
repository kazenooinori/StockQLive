import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import LoginModal from "./login-modal";

const {Component, PropTypes} = React;

const MenuRail = React.createClass({
    propTypes: {
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
    },
    onClickLogin () {
        $("#login-modal").modal("show");
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
    },
    renderLoginStatus () {
        const {user, onLogOutUser} = this.props;
        if (user.username) {
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
        } else {
            return (
                <div className="button-groups">
                    <button className="ui primary button" onClick={this.onClickLogin}>
                        login
                    </button>
                </div>
            );
        }
    },
    render () {
        return (
            <div className="menu-rail">
                <a className="logo">
                    <img src="/images/logo.png"/>
                </a>
                {this.renderLoginStatus()}
                <div className="ui secondary menu" ref="menu">
                    <a className="item active" data-tab="channe">Channel</a>
                    <a className="item" data-tab="members">Members</a>
                </div>
                <div className="ui tab segment board active" data-tab="channe">
                    Channel放在這裡
                </div>
                <div className="ui tab segment board" data-tab="members">
                    Members放在這裡
                </div>
            </div>
        );
    }
});

const mapStateToProps = function (state) {
    return {
        user: state.user
    };
};
const mapDispatchToProps = function (dispatch) {
    return {
        onLogOutUser: function () {
            dispatch(ChaActions.logOutUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuRail);
