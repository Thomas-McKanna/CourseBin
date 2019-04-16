import React from "react";

class SubmissionListItem extends React.Component {
    render() {
        return (
            <li className="submission">
                <div>
                    <p>{this.props.courseName}</p>
                    <p>{this.props.courseNo}</p>
                    <p>{this.props.school}</p>
                    <p>{this.props.semester}</p>
                    <p>{this.props.year}</p>
                    <p>{this.props.professor}</p>
                    <p>{this.props.username}</p>
                </div>
            </li>
        );
    }
}

export default SubmissionListItem;