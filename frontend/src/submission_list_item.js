import React from "react";
import { 
    Link
} from "react-router-dom";
import arrow from "./images/submission_arrow.png"

class SubmissionListItem extends React.Component {
    render() {
        return (
            <li className="submission">
                <div className="submission_item">
                    <span className="submission_summary">
                        <div className="name_row">
                            <span className="number">{this.props.courseNo}</span>
                            <span className="name">{this.props.courseName}</span>
                        </div>
                        <div className="time_prof">
                            <span className="time">{this.props.semester} {this.props.year}</span>
                            <span className="prof">({this.props.professor})</span>
                        </div>
                        <div className="school">
                            {this.props.school}
                        </div>
                    </span>
                    <span className="to_submission_btn">
                        <Link to='/'>
                            <img 
                                src={arrow}
                            />
                        </Link>
                    </span>
                </div>
            </li>
        );
    }
}

export default SubmissionListItem;