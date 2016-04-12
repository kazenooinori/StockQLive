import React from "react";
import TextMessage from "../components/text-message.jsx";
import InformationRail from "./information-rail";
import MenuRail from "./menu-rail";
import LoginModal from "../components/login-modal";
import SignUpModal from "../components/signup-modal";
import Messager from "./messager";
import CreateChannelModal from "../components/create-channel-modal";
import {connect} from "react-redux";
import * as ChaActions from '../actions/cha-actions';
import Highcharts from 'highcharts/highstock';

const {Component, PropTypes} = React;

const checkLatestPrice = (stock) => stock.latest_price !== -1;
import StockItem from "../components/stock-item";

const Liveroom = React.createClass({
    propTypes: {
        user: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        channel: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            ownerUsername: PropTypes.string.isRequired,
            chatroomId: PropTypes.string.isRequired,
        }),
        socket: PropTypes.object.isRequired,
        onInitUser: PropTypes.func.isRequired,
        onFetchChannels: PropTypes.func.isRequired,
        onLogInUser: PropTypes.func.isRequired,
        onSignUpUser: PropTypes.func.isRequired,
    },
    componentDidMount() {
        // initialize messages
        const {onFetchChannels, onInitUser} = this.props;
        onInitUser();
        onFetchChannels();

        this.props.updateStocks();

// for demo stock chart
        var seriesOptions = [],
            seriesCounter = 0,
            names = ['MSFT', 'AAPL', 'GOOG'];
        $.each(names, function (i, name) {
            $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
                // As we're loading the data asynchronously, we don't know what order it will arrive. So
                // we keep a counter and create the chart when all the data is loaded.
                seriesCounter += 1;
                if (seriesCounter === names.length) {
                    createChart();
                }
            });
        });
        function createChart() {
            Highcharts.StockChart('stock-chart', {
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
              series: seriesOptions
           });
        }
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
        const {
            onLogInUser,
            onSignUpUser,
            onCreateChannel,
            channel,
            socket,
            stocks,
        } = this.props;
        return (
            <div className="liveroom">
                <div className="left_col">
                    <MenuRail/>
                </div>
                <div className="main_col">
                    <h1 className="ui dividing header">
                        {channel.name}
                    </h1>
                    <Messager
                        channel={channel}
                        socket={socket}/>
                    <div className="tail">
                        <div id="stock-chart">

                        </div>
                        <div className="ui tab segment board active">
                            <div className="stock-list ui middle aligned selection list">
                                {this.renderStockItems(stocks)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right_col">
                    <Messager
                        channel={channel}
                        socket={socket}/>
                </div>

                <LoginModal
                    onLogInUser={onLogInUser}/>
                <SignUpModal
                    onSignUpUser={onSignUpUser}/>
                <CreateChannelModal
                    onCreateChannel={onCreateChannel}/>
            </div>
        );
    },
});
/*


 */

const mapStateToProps = function (state) {
    return {
        user: state.user,
        stocks: state.stocks,
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        onInitUser: function () {
            dispatch(ChaActions.initUser());
        },
        onLogInUser: function (user) {
            dispatch(ChaActions.logInUser(user));
        },
        onSignUpUser: function (user) {
            dispatch(ChaActions.signUpUser(user));
        },
        onFetchChannels: function () {
            dispatch(ChaActions.fetchChannels());
        },
        onCreateChannel: function (channel) {
            dispatch(ChaActions.createChannel(channel));
        },
        updateStocks: () => {
            dispatch(ChaActions.updateStocks());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Liveroom);
