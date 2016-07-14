import React from "react";
import * as momentUtils from "../../shared/lib/moment-utils";

const {PropTypes} = React;

const StockCard = React.createClass({
    propTypes: {
        stock: PropTypes.object
    },
    renderStocks (stocks) {
        if (stocks) {
            return stocks.map((stock) => (<div>stock</div>));
        }
    },
    render () {
        const { stock } = this.props;
        return (
            <div className="ui card">
              <div className="content">
                <div className="header">{stock.number}</div>
                <div className="description">
                  {this.renderStocks(stock.data)}
                </div>
              </div>
            </div>
        );
    }
});

export default StockCard;
