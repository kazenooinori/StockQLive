import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import StockItem from "../components/stock-item";

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
                        <StockItem
                            name="台積電5278"/>
                        <StockItem
                            name="宏達電5566"/>
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
