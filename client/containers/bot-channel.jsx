import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import Messager from "./messager";
import * as ChaActions from "../actions/cha-actions";

const BotChannel = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: PropTypes.object,
    },
    componentDidMount() {
        const { user } = this.props;
        const channel = {
            _id: "bot_channel-" + user.get("_id"),
            ownerUsername: "admin",
            name: "bot",
            chatroomId: "bot_channel-" + user.get("_id"),
        };
        this.props.setChannel(channel);
    },
    render () {
        return (
            <div>
                <Messager/>
            </div>
        );
    },
});
const mapStateToProps = (state) => ({user: state.user});
export default connect(mapStateToProps, ChaActions)(BotChannel);
