import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";

const {Component, PropTypes} = React;

const InformationRail = React.createClass({
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
    },
    render () {
        return (
            <div className="information-rail">
                <div className="ui secondary menu" ref="menu">
                    <a className="item active" data-tab="stockprice">股價</a>
                    <a className="item" data-tab="news">新聞</a>
                </div>
                <div className="ui tab segment board active" data-tab="stockprice">
                    <div className="stock-list ui middle aligned selection list">
                        <div className="stock-item item">
                            <div className="content">
                                <div className="description clearfix">
                                    <span className="name">台積電5278</span>
                                    <div className="ui red horizontal label">+0.5%</div>
                                    <div className="ui horizontal label">22.34</div>
                                </div>
                            </div>
                        </div>
                        <div className="stock-item item">
                            <div className="content">
                                <div className="description clearfix">
                                    <span className="name">宏達電HTC5566</span>
                                    <div className="ui green horizontal label">-2.3%</div>
                                    <div className="ui horizontal label">150.34</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui tab segment board" data-tab="news">
                    新聞放在這裡
                </div>
            </div>
        );
    }
});


export default InformationRail;
