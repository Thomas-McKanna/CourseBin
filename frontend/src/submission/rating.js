import './style.css'
import React from "react";

import fullStar from "./images/filled_star.png"
import halfFullStar from "./images/half_filled_star.png"
import emptyStar from "./images/unfilled_star.png"

class Rating extends React.Component {

    state = {
        stars: 10,
        needsToLogIn: false,
    }

    constructor(props) {
        super(props);

        this.setStarState = this.setStarState.bind(this);
    }

    componentDidMount() {
        this.props.getValue(this.props.id, this.setStarState)
    }

    setStarState(value) {
        this.setState({ stars: value })
    }

    render() {
        const stars = this.makeStars(this.state['stars'])
        return (
            
            <span className="star_grouping">
                {stars}
            </span>
        );
    }

    makeStars(rating) {
        var starRatings = []
        var i = 5;
        // determines how many filled stars to display
        // (each filled star takes '2' rating)
        while (i > 0) {
            if (rating >= 2) {
                starRatings.push(fullStar);
                rating -= 2;
            } else if (rating === 1) {
                starRatings.push(halfFullStar);
                rating -= 1;
            } else {
                starRatings.push(emptyStar);
            }
            i -= 1;
        }

        const stars = starRatings.map((starRating, index) =>
            <button key={index} className="star">
                <img 
                    src={starRating}
                    alt="star" 
                    onClick={((e) => this.props.setStars(e, this.props.id, index, this.setStarState))} />
            </button>
        );

        return stars;
    }
}

export default Rating;