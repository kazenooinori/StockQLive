import React from "react";
import {connect} from "react-redux";
import * as ChaActions from "../actions/cha-actions";
const {Component, PropTypes}  = React;

class RequestList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onFetchAllRequests();
    }
    renderRequests(requests) {
        return requests.map((request) => {
            return (
                <a key={request._id} href="#" className="list-group-item">
                    {request.content} - {request.ownerId}
                </a>
            )
        });
    }
    render() {
        const {requests} = this.props;
        return (
            <div className="request-list list-group">
                {this.renderRequests(requests)}
            </div>
        );
    }
}
RequestList.propTypes = {
    requests: PropTypes.array.isRequired,
    onFetchAllRequests: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => {
    return {
        requests: state.requests
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllRequests: () => {
            console.log("going to fetch");
            dispatch(ChaActions.fetchAllRequests());
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
