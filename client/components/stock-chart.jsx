import React from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts/highstock';
import PureRenderMixin from "react-addons-pure-render-mixin";

const {PropTypes} = React;

const StockChart = React.createClass({
    propTypes: {
        _id: PropTypes.string.isRequired,
        stockSeries: PropTypes.object.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
    },
    mixins: [PureRenderMixin],
    componentDidMount() {
        this.renderStockChart(this.props.stockSeries.toJS());
    },
    componentWillUpdate (nextProps, nextState) {
        // if (Highcharts.StockChart('stock-chart')) {
            // this.chart.destroy();
        const { _id } = this.props;
        Highcharts.StockChart(_id).destroy();
        this.renderStockChart(nextProps.stockSeries.toJS());
        // }
    },
    renderStockChart (stockSeries) {
        const { _id, width, height } = this.props;
        Highcharts.StockChart(_id, {
          rangeSelector: {
              selected: 4
          },
          chart: {
              width: width || 500,
              height: height || 300,
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
            <div id={this.props._id}></div>
        );
    }
});

export default StockChart;
