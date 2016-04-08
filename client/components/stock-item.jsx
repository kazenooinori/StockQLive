import React from "react";
import ReactDOM from "react-dom";
import StockItemPopup from "./stock-item-popup";

const {PropTypes} = React;

const StockItem = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired,
        latestPrice: PropTypes.number.isRequired,
        yesterdayPrice: PropTypes.number.isRequired,
    },
    componentDidMount () {
        $(ReactDOM.findDOMNode(this)).find(".content").popup({
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
        const {name, latestPrice, yesterdayPrice} = this.props;
        const difference = (100*(yesterdayPrice - latestPrice)/yesterdayPrice).toFixed(2);
        const labelClass = difference >= 0 ? "red" : "green";
        return (
            <div className="stock-item item">
                <div className="content">
                    <div className="description clearfix">
                        <span className="name">{name}</span>
                        <div className={"ui horizontal label " + labelClass}>{difference}%</div>
                        <div className="ui horizontal label">{latestPrice}</div>
                    </div>
                </div>
                <StockItemPopup {...this.props}/>
            </div>
        );
    }
});

export default StockItem;
