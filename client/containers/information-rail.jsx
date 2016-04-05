import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";

const {Component, PropTypes} = React;

const InformationRail = React.createClass({
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();
        $(".stock-item .content").popup({
            inline: true,
            hoverable: true,
            position : 'bottom left',
            delay: {
              show: 300,
              hide: 200
            }
        });
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
                            <div className="stock-popup ui popup">
                                <div className="header">台積電5278</div>
                                <div className="ui middle aligned divided list">
                                    <div className="item">
                                        <div className="content">
                                            <div className="header">
                                                <span className="name">目前股價</span>
                                                <div className="ui horizontal label">455.33</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header">
                                                <span className="name">漲幅</span>
                                                <div className="ui red horizontal label">0.5%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header">
                                                <span className="name">成交量</span>
                                                <div className="ui horizontal label">5566</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header">
                                                <span className="name">最高</span>
                                                <div className="ui horizontal label">43</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header">
                                                <span className="name">最低</span>
                                                <div className="ui horizontal label">39</div>
                                            </div>
                                        </div>
                                    </div>
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
