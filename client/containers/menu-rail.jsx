import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import LoginModal from "./login-modal";

const {Component, PropTypes} = React;

const MenuRail = React.createClass({
    onClickLogin () {
        $("#login-modal").modal("show");
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
    },
    render () {
        return (
            <div className="menu-rail">
                <a className="logo">
                    <img src="/images/logo.png"/>
                </a>
                <div className="button-groups">
                    <button className="ui primary button" onClick={this.onClickLogin}>
                        login
                    </button>
                </div>
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


export default MenuRail;
