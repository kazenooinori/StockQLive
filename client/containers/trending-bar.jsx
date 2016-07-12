import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import StockChart from "../components/stock-chart";
import IndexPanel from "../components/index-panel";

import {List} from "immutable";

const TrendingBar = React.createClass({
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
            </div>
        )
    }
});

export default connect()(TrendingBar);
