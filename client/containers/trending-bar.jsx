import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import StockChart from "../components/stock-chart";
import IndexPanel from "../components/index-panel";
import StockPanel from "../components/stock-panel";
import * as StockActions from "../actions/stock-actions";

import LoggedInController from "../components/logged-in-controller";
import LoggingInController from "../components/logging-in-controller";

import {List} from "immutable";

const TrendingBar = React.createClass({
    componentDidMount () {
        // TODO should fetch multiple stock price at once
        this.props.fetchStockCurrentPrice("t00");
        this.props.fetchStockCurrentPrice("o00");
    },
    renderLoginStatus () {
        const { user } = this.props;
        if (user.get("_id")) {
            return (
                <a className="ui basic image label">
                  <img src={user.get("photos")}/>
                  {user.get("displayName")}
                </a>
            );
        } else {
            return (
                <a className="ui facebook button" href="/auth/facebook">
                    <i className="facebook icon"></i>Facebook登入
                </a>
            );
        }
    },
    render () {
        const { stockByNumber } = this.props;
        const TSE = stockByNumber.get("t00"); // 加權指數
        const OTC = stockByNumber.get("o00"); // 上櫃指數
        return (
            <div className="trending-bar">
                <StockPanel
                    _id="stock-exchange"
                    name="加權指數"
                    latestPrice={TSE ? TSE.get('latest_price') : "--"}
                    difference={TSE ? TSE.get("yesterday_price") - TSE.get('latest_price') : 0}
                    chartWidth={150}
                    chartHeight={80}/>
                <StockPanel
                    _id="over-the-counter"
                    name="上櫃指數"
                    latestPrice={OTC ? OTC.get('latest_price') : "--"}
                    difference={OTC ? OTC.get("yesterday_price") - OTC.get('latest_price') : 0}
                    chartWidth={150}
                    chartHeight={80}/>
                <div className="user">
                    {this.renderLoginStatus()}
                </div>
            </div>
        )
    }
});
const mapStateToProps = (state) => ({
    user: state.user,
    stockByNumber: state.stockByNumber,
});
export default connect(mapStateToProps, StockActions)(TrendingBar);
