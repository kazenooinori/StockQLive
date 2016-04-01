import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";

const {Component, PropTypes} = React;

const MenuRail = React.createClass({
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
    },
    render () {
        return (
            <div className="menu-rail">
                <a className="logo">
                    <img src="/images/logo.png"/>
                </a>
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
