import React from "react";
import ReactDOM from "react-dom";

const {PropTypes} = {React};

const StockTrendRail = React.createClass({
    render () {
        return (
            <div className="stock-trend-rail">
                <div className="ui small header">趨勢類別</div>
                <div className="trend-categorys">
                    <div className="trend-category">
                        <div className="trend-title">
                            上市股票
                        </div>
                        <div className="trend-body bg-gray">
                            股
                        </div>
                    </div>
                    <div className="trend-category">
                        <div className="trend-title">
                            上櫃股票
                        </div>
                        <div className="trend-body bg-bluegray">
                            櫃
                        </div>
                    </div>
                    <div className="trend-category">
                        <div className="trend-title">
                            原物料
                        </div>
                        <div className="trend-body bg-yellow">
                            原
                        </div>
                    </div>
                    <div className="trend-category">
                        <div className="trend-title">
                            匯率
                        </div>
                        <div className="trend-body bg-lipstick">
                            匯
                        </div>
                    </div>
                </div>



                <div className="ui small header">熱門標籤</div>
                <div className="trend-tags ui divided selection list">
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>234</div>
                      <div className="ui red horizontal label">1</div>
                      黃金
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>123</div>
                      <div className="ui red horizontal label">2</div>
                      台積電
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>64</div>
                      <div className="ui red horizontal label">3</div>
                      葉倫
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>33</div>
                      <div className="ui grey horizontal label">4</div>
                      Apple
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>24</div>
                      <div className="ui grey horizontal label">5</div>
                      能源會議
                  </a>
                </div>




                <div className="ui small header">熱門投資人</div>
                <div className="trend-tags ui divided selection list">
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>234</div>
                      <div className="ui red horizontal label">1</div>
                      雷光夏
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>123</div>
                      <div className="ui red horizontal label">2</div>
                      綠角
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>64</div>
                      <div className="ui red horizontal label">3</div>
                      MarcoMarco
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>33</div>
                      <div className="ui grey horizontal label">4</div>
                      Bestdo
                  </a>
                  <a className="item">
                      <div className="right floated"><i className="user icon"></i>24</div>
                      <div className="ui grey horizontal label">5</div>
                      天元突破
                  </a>
                </div>




            </div>
        );
    }
});

export default StockTrendRail;
