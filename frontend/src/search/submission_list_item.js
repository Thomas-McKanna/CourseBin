import React from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import arrow from "./images/submission_arrow.png"
import Rating from "../util/rating"

class SubmissionListItem extends React.Component {
    
    state = {
        stars: 10,
    }

    render() {
        const url = `/submissions/${this.props.id}`
        console.log(url)

        return (
            <li className="submission">
                <div className="submission_item">
                    <span className="submission_summary">
                        <div className="rating_row">
                            <span>Rating: </span>
                            <Rating 
                                className="rating" 
                                loggedIn={true}
                                id={this.props.id}
                                submission={this.props.submission}
                                getValue={this.getRating} 
                                setStars={this.ignoreRating} />
                        </div>
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
                        <Link to={url}>
                            <img 
                                src={arrow}
                                alt="arrow"
                            />
                        </Link>
                    </span>
                </div>
            </li>
        );
    }

    getRating(id, callback) {
        const apiRequest = `/api/v1/rate/submission/${id}`
        axios.get(apiRequest)
        .then(function(response) {
            if (response.status === 200) {
                const numStars = response.data.result;
                callback(numStars)
            }
        }).catch(function (error) {
            callback(0) // not yet rated
        });
    }

    ignoreRating(e, id, index, callback) {
        return; // ignores clicking on rating stars
    }


}

export default SubmissionListItem;