import React, { Component, PropTypes } from "react";
import { withRouter, Link } from "react-router";
import { connect } from "react-redux";
import classNames from "classnames";

const MenuSidebar = ({ channel }) => (
    <div className="menu-sidebar">
        <a className="logo">
            <img src="/images/logo.png"/>
        </a>
        <div className="channels">
            <Link className={classNames("channel", {selected: channel === "public"})} to="/">
                <i className="comments outline icon"></i>股票聊天室
            </Link>
            <Link className={classNames("channel", {selected: channel === "stockbot"})} to="/stockbot">
                <i className="spy icon"></i>個股Bot
            </Link>
            <a className="channel" href="https://startertech.webinarninja.co/my/wnwebinarlist/index?webinar_id=16589" target="_blank">
                <i className="spy icon"></i>直播網址
            </a>
        </div>
    </div>
);

export default MenuSidebar;
