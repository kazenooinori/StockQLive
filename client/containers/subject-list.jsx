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
        const { subjects } = this.props;
        return (
            <div className="subject-list">
                <table className="ui selectable table">
                  <thead>
                    <tr>
                      <th>標題</th>
                      <th>日期</th>
                      <th>作者</th>
                      <th>原文連結</th>
                      <th>讚</th>
                      <th>不喜歡</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.renderSubjects(subjects)}
                  </tbody>
                </table>
            </div>
        );
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
