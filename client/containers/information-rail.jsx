import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
import StockItem from "../components/stock-item";

const {Component, PropTypes} = React;

const checkLatestPrice = (stock) => stock.latest_price !== -1;
const InformationRail = React.createClass({
    propTypes: {
        stocks: PropTypes.array,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this.refs.menu)).find('.item').tab();

        this.props.updateStocks();
    },
    renderStockItems (stocks) {
        return stocks.filter(checkLatestPrice).map((stock) => {
            return (
                <StockItem
                    key={stock.number}
                    name={stock.name}
                    latestPrice={stock.latest_price}
                    yesterdayPrice={stock.yesterday_price}/>
            );
        });
    },
    render () {
        const {stocks} = this.props;
        return (
            <div className="information-rail">
                <div className="ui secondary menu" ref="menu">
                    <a className="item active" data-tab="stockprice">股價</a>
                    <a className="item" data-tab="news">新聞</a>
                </div>
                <div className="ui tab segment board active" data-tab="stockprice">
                    <div className="stock-list ui middle aligned selection list">
                        {this.renderStockItems(stocks)}
                    </div>
                </div>
                <div className="ui tab segment board" data-tab="news">
                    新聞放在這裡
                </div>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        stocks: state.stocks,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStocks: () => {
            dispatch(ChaActions.updateStocks());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InformationRail);
