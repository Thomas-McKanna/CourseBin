import './style.css'
import React from "react";
import axios from "axios"

import Rating from "./rating"

class Content extends React.Component {

    constructor(props) {
        super(props)

        this.downloadContent = this.downloadContent.bind(this);
    }

    render() {
        return (
            <li className="content_item">
                <div>
                    <Rating className="rating"></Rating>
                     <span className="filename">{this.props.filename}</span>
                     <button className="download_btn" onClick={this.downloadContent}>
                         Download
                     </button>
                </div>
            </li>
        );
    }

    downloadContent() {
        var self = this; // bind "this" so that callbacks can use it
        
        axios.get(`/api/v1/download/${this.props.url}`)
        .then(function(response) {
            if (response.status === 200) {
                console.log(response)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default Content;