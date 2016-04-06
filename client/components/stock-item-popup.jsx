import React from "react";

const {PropTypes} = React;

const StockItemPopup = React.createClass({
    propTypes: {
        name: PropTypes.string.isRequired,
    },
    render () {
        const {name} = this.props;
        return (
            <div className="stock-popup ui popup">
                <div className="header">{name}</div>
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
        );
    }
});

export default StockItemPopup;
