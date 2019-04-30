import './style.css'
import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import { Redirect } from "react-router-dom";

import Rating from "../util/rating"

class Content extends React.Component {

    state = {
        needsToLogIn: false,
    }

    constructor(props) {
        super(props)

        this.downloadContent = this.downloadContent.bind(this);
        this.rate = this.rate.bind(this);
    }

    render() {
        return (
            <li className="content_item">
                <div>
                    {this.state['needsToLogIn'] && 
                        <Redirect push 
                            to={{
                                pathname: "/login",
                                state: { warning: 'You need to be logged in rate content.'}
                            }} />
                    }
                    <Rating 
                        className="rating" 
                        id={this.props.url}
                        submission={this.props.submission}
                        getValue={this.getRating} 
                        setStars={this.rate} />
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

    getRating(url, callback) {
        const apiRequest = `/api/v1/rate/content/${url}`
        axios.get(apiRequest)
        .then(function(response) {
            if (response.status === 200){
                const numStars = response.data.result;
                callback(numStars)
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    rate(e, url, index, callback) {
        if (!this.props.loggedIn) {
            this.setState( {needsToLogIn: true })
            return;
        }
        
        // let the Rating object know what it should set its stars to
        callback((index+1)*2)
        
        const cookies = new Cookies();
        const apiRequest = `/api/v1/rate/content/${url}/submission/`
            + `${this.props.submission}/rating/${(index+1)*2}`
        axios.post(apiRequest, {},
            { headers: {
                "Authorization": `bearer ${cookies.get('auth')}`
            }
        })
        .then(function(response) {
            if (response.status === 200){
                // success
            }
        }).catch(function (error) {
            console.log(error);
        });

        return;
    }
}

export default Content;