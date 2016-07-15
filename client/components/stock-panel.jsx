import React from "react";
import IndexPanel from "./index-panel";
import StockChart from "./stock-chart";

import {List} from "immutable";

const StockPanel = ({ _id, name, latestPrice, difference, chartWidth, chartHeight }) => (
    <div className="kanban">
        <IndexPanel
            name={name}
            index={latestPrice}
            difference={difference}/>
        <StockChart
            _id={_id}
            stockSeries={List()}
            width={chartWidth}
            height={chartHeight}/>
    </div>
);

export default StockPanel;
