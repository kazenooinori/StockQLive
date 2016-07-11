import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

import Messager from "./messager";
//
// import TextMessage from "../components/text-message.jsx";
// import LoginModal from "../components/login-modal";
// import SignUpModal from "../components/signup-modal";
// import StockChart from "../components/stock-chart";
// import CreateChannelModal from "../components/create-channel-modal";
// import StockItem from "../components/stock-item";


const {Component, PropTypes} = React;

const BotChannel = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
        // socket: PropTypes.object.isRequired,
    },
    componentDidMount() {
    },
    render () {
        return (
            <div>publicChannel</div>
        );
    },
});
const mapStateToProps = function (state) {
    return {
    };
}
const mapDispatchToProps = function (dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BotChannel);
