import React from "react";
import ReactDOM from "react-dom";

const {PropTypes} = React;

const Timeline = React.createClass({
    componentDidMount () {
        $('.subject .accordion')
          .accordion({
            selector: {
              trigger: '.title'
            }
          });
    },
    render () {
        return (
            <div className="timeline">
                <div className="left_col">
                    left
                </div>
                <div className="main_col">
                    <div className="trend-card-list">
                        <div className="trend-card ui card">
                          <div className="content">
                              <i className="ui red circular label right floated stock-label trend-label line chart icon"></i>
                              <span className="ui grey circular label right floated stock-label trend-label">股</span>
                              <span className="ui teal circular label right floated stock-label period-label">3-4 個月</span>
                              <img className="floated left mini ui image" src="/images/avatar.jpg"/>
                              <div className="header">
                                  雷光夏
                              </div>
                              <div className="meta">
                                  <span>@leiguan</span>
                              </div>
                            <div className="description">
                              <p>醫療技術將成為下一個股市風口！ <a href="http://www.businessweekly.com.tw/KBlogArticle.aspx?ID=16211&path=c">http://www.businessweekly.com.tw/KBlogArticle.aspx?ID=16211&path=c</a></p>
                            </div>
                            <div className="subject">
                                <div className="ui accordion">
                                    <button className="ui blue basic button title">
                                        <span>標的分析??</span>
                                        <i className="angle down icon"></i>
                                    </button>
                                  <div className="content">
                                    <div className="transition hidden">

                                        <table className="ui table selectable striped">
                                          <thead>
                                            <tr>
                                              <th></th>
                                              <th></th>
                                              <th>市價</th>
                                              <th>停利價</th>
                                              <th>停損價</th>
                                              <th>說明</th>
                                              <th></th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td style={{"min-width": "100px"}}>2230 台積電</td>
                                              <td style={{"min-width": "70px"}}>
                                                  <span className="ui red label">買進</span>
                                              </td>
                                              <td><span className="fg-red">150.5</span></td>
                                              <td><p className="ta-center">165</p><p className="fg-red ta-center">(4.05%)</p></td>
                                              <td><p className="ta-center">145</p><p className="fg-green ta-center">(6.35%)</p></td>
                                              <td>這是說明這是說明這是說明這是說明這是說明這是說明這是說明</td>
                                              <td>
                                                <button className="ui icon button">
                                                  <i className="plus icon"></i>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style={{"min-width": "100px"}}>2330 宏達電</td>
                                              <td style={{"min-width": "70px"}}>
                                                  <span className="ui red label">買進</span>
                                              </td>
                                              <td><span className="fg-red">150.5</span></td>
                                              <td><p className="ta-center">165</p><p className="fg-red ta-center">(4.05%)</p></td>
                                              <td><p className="ta-center">145</p><p className="fg-green ta-center">(6.35%)</p></td>
                                              <td>這是說明這是說明這是說明這是說明這是說明這是說明這是說明</td>
                                              <td>
                                                <button className="ui icon button">
                                                  <i className="plus icon"></i>
                                                </button>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style={{"min-width": "100px"}}>1234 鴻海</td>
                                              <td style={{"min-width": "70px"}}>
                                                  <span className="ui green label">賣出</span>
                                              </td>
                                              <td><span className="fg-red">150.5</span></td>
                                              <td><p className="ta-center">165</p><p className="fg-red ta-center">(4.05%)</p></td>
                                              <td><p className="ta-center">145</p><p className="fg-green ta-center">(6.35%)</p></td>
                                              <td>這是說明這是說明這是說明這是說明這是說明這是說明這是說明</td>
                                              <td>
                                                <button className="ui icon button">
                                                  <i className="plus icon"></i>
                                                </button>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>


                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className="extra content">

                          </div>
                        </div>
                    </div>
                </div>
                <div className="right_col">
                    left
                </div>
            </div>
        );
    }
});

export default Timeline;
