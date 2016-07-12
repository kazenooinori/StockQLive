import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import StockChart from "../components/stock-chart";
import IndexPanel from "../components/index-panel";

import LoggedInController from "../components/logged-in-controller";
import LoggingInController from "../components/logging-in-controller";

import {List} from "immutable";

const TrendingBar = React.createClass({
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
        return (
            <div className="trending-bar">
                <div className="kanban">
                    <IndexPanel
                        name="上市指數"
                        index={8754.29}
                        difference={10.2}/>
                    <StockChart
                        _id="stock-exchange"
                        stockSeries={List()}
                        width={150}
                        height={80}/>
                </div>
                <div className="kanban">
                    <IndexPanel
                        name="上櫃指數"
                        index={8754.29}
                        difference={10.2}/>
                    <StockChart
                        _id="over-the-counter"
                        stockSeries={List()}
                        width={150}
                        height={80}/>
                </div>
                <div className="user">
                    {this.renderLoginStatus()}
                </div>
            </div>
        )
    }
});
const mapStateToProps = (state) => ({
    user: state.user
});
export default connect(mapStateToProps)(TrendingBar);
