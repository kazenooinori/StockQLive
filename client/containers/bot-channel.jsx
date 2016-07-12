import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import Messager from "./messager";

const channelId = "bot_channel";
const BotChannel = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
    },
    componentDidMount() {
    },
    render () {
        return (
            <div>
                <Messager/>
            </div>
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
