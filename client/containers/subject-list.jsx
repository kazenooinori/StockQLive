import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as SubjectActions from "../actions/subject-actions";
import * as momentUtils from "../../shared/lib/moment-utils";

const { PropTypes } = React;
const SubjectList = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        subjects: PropTypes.object,
        onInitSubjects: PropTypes.func.isRequired,
    },
    getInitialState () {
        return {
            skip: 15,
        };
    },
    componentDidMount () {
        const { onInitSubjects } = this.props;

        onInitSubjects();
    },
    renderSubjects (subjects) {
        return subjects.map((subject) => {
            return (
                <tr key={subject._id}>
                  <td>{subject.name}</td>
                  <td>{momentUtils.simpleFormattedDate(subject.postedAt)}</td>
                  <td>{subject.author}</td>
                  <td><a href={subject.uri} target="_blank">原文連結</a></td>
                  <td>{subject.likes}</td>
                  <td>{subject.dislikes}</td>
                </tr>
            );
        });
    },
    render () {
        const { subjects, onLoadMoreSubjects } = this.props;
        const { skip } = this.state;
        return (
            <div className="subject-list">
                <table className="ui selectable table">
                  <thead>
                    <tr>
                      <th className="five wide">標題</th>
                      <th className="one wide">日期</th>
                      <th className="one wide">作者</th>
                      <th className="two wide">原文連結</th>
                      <th className="one wide">讚</th>
                      <th className="one wide">不喜歡</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.renderSubjects(subjects)}
                  </tbody>
                </table>
                <div className="ui centered grid p-10">
                    <button className="ui primary button" onClick={this._onLoadMoreSubjects}>
                        讀更多
                    </button>
                </div>
            </div>
        );
    },

    _onLoadMoreSubjects () {
        this.props.onLoadMoreSubjects(this.state.skip)
        this.setState((prevState) => {
            prevState.skip += 15;
            return prevState;
        });
    },
});

function mapStateToProps (state) {
    return {
        subjects: state.subjects
    };
}
function mapDispatchToProps (dispatch) {
    return {
        onInitSubjects: function () {
            dispatch(SubjectActions.initSubjects());
        },
        onLoadMoreSubjects: function (skip) {
            dispatch(SubjectActions.loadMoreSubjects(skip));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
