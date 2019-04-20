import './style.css'
import React from "react";
import axios from "axios"

import fullStar from "./images/filled_star.png"
import halfFullStar from "./images/half_filled_star.png"
import emptyStar from "./images/unfilled_star.png"

class Rating extends React.Component {

    state = {
        stars: 9,
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
                    onClick={((e) => this.rate(e, index))} />
            </button>
        );

        return stars;
    }

    rate(event, index) {
        console.log(index)
        return;
    }
}

export default Rating;