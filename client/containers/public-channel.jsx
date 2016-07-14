import React, { PropTypes } from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { connect } from "react-redux";
import Messager from "./messager";
import * as ChaActions from "../actions/cha-actions";

const channel = {
    _id: "public_channel",
    ownerUsername: "admin",
    name: "public",
    chatroomId: "public_channel"
};
const PublicChannel = React.createClass({
    mixins: [PureRenderMixin],
    componentDidMount() {
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
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, ChaActions)(PublicChannel);
