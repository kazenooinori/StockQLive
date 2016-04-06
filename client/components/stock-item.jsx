import React from "react";
import ReactDOM from "react-dom";
import StockItemPopup from "./stock-item-popup";

const {PropTypes} = React;

const StockItem = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired,
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
        const {name} = this.props;
        return (
            <div className="stock-item item">
                <div className="content">
                    <div className="description clearfix">
                        <span className="name">{name}</span>
                        <div className="ui red horizontal label">+0.5%</div>
                        <div className="ui horizontal label">22.34</div>
                    </div>
                </div>
                <StockItemPopup {...this.props}/>
            </div>
        );
    }
});

export default StockItem;
