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
        axios({
            url: `/api/v1/download/${this.props.url}`,
            method: 'GET',
            responseType: 'blob',
        }).then(function(response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', self.props.filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default Content;