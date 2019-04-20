import './style.css'
import React from "react";
import axios from "axios"

import Content from "./content"

class Submission extends React.Component {

    state = {
        contentLoaded: false,
    }

    constructor(props) {
        super(props);
        this.id = props.match.params['id']
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
                <p>Loading...</p>
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
                    filename={item.filename}
                    url={item.url}/>
            );
        }
        else {
            listOfContent = (
                <li>This submission doesn't seem to have any content.</li>
            )
        }

        return (
            <div>
                <div className="upload_info">
                    Uploaded by {meta['username']} on {meta['date_created']}
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
}

export default Submission;