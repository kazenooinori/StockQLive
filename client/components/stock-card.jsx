import React from "react";
import * as momentUtils from "../../shared/lib/moment-utils";

var Highcharts = require('highcharts/highstock');

var Chart = React.createClass({
    // When the DOM is ready, create the chart.
    componentDidMount: function() {
      // Extend Highcharts with modules
      if (this.props.modules) {
        this.props.modules.forEach(function(module) {
          module(Highcharts);
        });
      }
      // Set container which the chart should render to.
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container,
        this.props.options
      );
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      return React.createElement('div', {
        id: this.props.container
      });
    }
  });

var stockChartConf = {
  container: 'stockChart',
  type: 'stockChart',
  options: {
    rangeSelector: {
      selected: 0
    },
    title: {
      text: '3520'
    },
    tooltip: {
      style: { width: '200px'},
      valueDecimals: 4,
      shared: true
    },
    yAxis: {
      title: { text: 'Exchange rate'}
    },
    series: [{
      name: 'Stock in market',
      data: [] // empty data here
    }]
  }
};

const {PropTypes} = React;

const StockCard = React.createClass({
    propTypes: {
        stock: PropTypes.object
    },
    renderStocks (stocks) {
        if (stocks) {
            stockChartConf.options.series[0].data = stocks;
            return React.createElement(Chart, stockChartConf); 
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
