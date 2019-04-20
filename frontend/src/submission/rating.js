import './style.css'
import React from "react";
import axios from "axios"

import star from "./images/filled_star.png"

class Rating extends React.Component {

    render() {
        return (
            <span className="star_grouping">
                <button className="star">
                    <img src={star} alt="star" onClick={this.myfunction} />
                </button>
                <button className="star">
                    <img src={star} alt="star" onClick={this.myfunction} />
                </button>
                <button className="star">
                    <img src={star} alt="star" onClick={this.myfunction} />
                </button>
                <button className="star">
                    <img src={star} alt="star" onClick={this.myfunction} />
                </button>
                <button className="star">
                    <img src={star} alt="star" onClick={this.myfunction} />
                </button>
            </span>
        );
    }

    myfunction() {
        return;
    }
}

export default Rating;