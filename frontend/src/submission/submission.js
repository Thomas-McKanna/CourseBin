import './style.css'
import React from "react";
import axios from "axios"
import { Redirect } from "react-router-dom";
import LoadingGIF from '../images/loading.gif'

import Content from "./content"

class Submission extends React.Component {

    state = {
        contentLoaded: false,
        wantsToSubmit: false,
    }

    constructor(props) {
        super(props);
        this.id = props.match.params['id']

        this.buildBody = this.buildBody.bind(this);
        this.addSubmission = this.addSubmission.bind(this);
    }

    componentDidMount() {
        var self = this; // bind "this" so that callbacks can use it
        const apiRequest = `/api/v1/submissions/${this.id}`
        axios.get(apiRequest)
        .then(function(response) {
            if (response.status === 200) {
                self.setState({ metadata: response.data.result[0] })
                self.setState({ content: response.data.related_content })
                self.setState({ contentLoaded: true })
            } 
        })
        .catch(function (error) {
            //console.log(error);
        });
    }

    render() {
        var body;
        if (this.state['contentLoaded']) {
            body = this.buildBody()
        } else {
            body = this.contentNotYetReady()
        }

        return (
            <div>
                {body}
            </div>
        );
    }

    contentNotYetReady() {
        return (
            <div>
                <center>
                    <img src={LoadingGIF} />
                </center>
            </div>
        );
    }

    buildBody() {
        const meta = this.state['metadata']
        const content = this.state['content']
        var listOfContent;
        if (content.length !== 0) {
            listOfContent = content.map((item) => 
                <Content 
                    key={item.url}
                    loggedIn={this.props.loggedIn}
                    filename={item.filename}
                    url={item.url}
                    submission={this.id} />
            );
        }
        else {
            listOfContent = (
                <li>This submission doesn't seem to have any content.</li>
            )
        }

        return (
            <div>
                {this.state['wantsToSubmit'] && 
                    <Redirect push 
                        to={{
                            pathname: "/", // TODO: Go to submission page for this course
                        }} />
                }
                <div className="upload_info">
                    Uploaded by {meta['username']} on {meta['date_created']}
                </div>
                <div className="add_submission">
                    <span>Have you taken this course?</span>
                    <button onClick={this.addSubmission}>Add Submission</button>
                </div>
                <div className="upper">
                    <div className="title">
                        <span className="number">{meta['number']}</span>
                        <span className="name">{meta['name']}</span>
                    </div>
                    <div className="info">
                        <span className="time">Took place: <b>{meta['semester']} {meta['year']}</b></span>
                        <br/>
                        <span className="professor">Taught by: <b>{meta['professor']}</b></span>
                    </div>
                    <div className="description">
                        <span className="desc_label">Description: </span>
                        <div className="description_box">
                            {meta['description']}
                        </div>
                    </div>
                </div>
                <div className="lower">
                    <ul>
                        {listOfContent}
                    </ul>
                </div>
            </div>
        );
    }

    addSubmission() {
        this.setState({ wantsToSubmit: true })
    }
}

export default Submission;