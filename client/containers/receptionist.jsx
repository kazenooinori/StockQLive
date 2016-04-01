import React from "react";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
const {Component, PropTypes} = React;


class Receptionist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }
    handleChangeInput(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleSubmitRequest(e) {
        e.preventDefault();

        this.props.onCreateRequest({
            ownerId: this.props.userId,
            content: this.state.text,
        });
        this.setState({
            text: "",
        });
    }
    renderRequests(requests) {
        return requests.map((request) => {
            return (
                <a key={request._id} href="#" className="list-group-item">{request.content}</a>
            );
        })
    }
    render() {
        const {onCreateRequest, requests} = this.props;
        const {text} = this.state;
        return (
            <div className="receptionist">
                <a href="/request-list" className="btn btn-default">問題集</a>
                <div className="input-group">
                    <form onSubmit={this.handleSubmitRequest.bind(this)}>
                        <input type="text" className="form-control" placeholder="你的問題" value={text} onChange={this.handleChangeInput.bind(this)}/>
                    </form>
                    <div className="input-group-btn">
                        <button type="submit" className="btn btn-default">問問題</button>
                    </div>
                </div>
                <div className="request-list list-group">
                    {this.renderRequests(requests)}
                </div>
            </div>
        );
    }
}
Receptionist.propTypes = {
    userId: PropTypes.string.isRequired,
    onCreateRequest: PropTypes.func.isRequired,
    requests: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        requests: state.requests,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onCreateRequest: (request) => {
            dispatch(ChaActions.createRequest(request));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Receptionist);
