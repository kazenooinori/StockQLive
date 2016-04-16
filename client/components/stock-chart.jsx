import React from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts/highstock';
import PureRenderMixin from "react-addons-pure-render-mixin";

const {PropTypes} = React;

const StockChart = React.createClass({
    propTypes: {
        stockSeries: PropTypes.object.isRequired,
    },
    mixins: [PureRenderMixin],
    chart: undefined,
    componentDidMount() {
        this.renderStockChart(this.props.stockSeries.toJS());
    },
    componentWillUpdate (nextProps, nextState) {
        if (this.chart) {
            this.chart.destroy();
            this.renderStockChart(nextProps.stockSeries.toJS());
        }
    },
    renderStockChart (stockSeries) {
        this.chart = Highcharts.StockChart('stock-chart', {
           rangeSelector: {
              selected: 4
          },

          yAxis: {
              labels: {
                  formatter: function () {
                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  }
              },
              plotLines: [{
                  value: 0,
                  width: 2,
                  color: 'silver'
              }]
          },

          plotOptions: {
              series: {
                  compare: 'percent'
              }
          },

          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2
          },
          series: stockSeries
       });
    },
    render () {
        return (
            <div id="stock-chart"></div>
        );
    }
});

export default StockChart;
