import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";

const TrendingBar = React.createClass({
    render () {
        return (
            <div classname="trending-bar">
                大盤
            </div>
        )
    }
});

export default connect()(TrendingBar);
