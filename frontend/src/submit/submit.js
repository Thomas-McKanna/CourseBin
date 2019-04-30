import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'
import { Redirect } from "react-router-dom";
import LoadingGIF from '../images/loading.gif'

class Submit extends React.Component {

    state = {
        contentLoaded: false,
        description: '',
        charCount: 0,
    }

    constructor(props) {
        super(props);
     
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var self = this; // bind "this" so that callbacks can use it
        axios.get('/api/v1/courses/' + this.props.match.params['id'])
        .then(function(response) {
            if (response.status === 200) {
                self.setState({ courseInfo: response.data.result[0]})
                self.setState({ contentLoaded: true })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleDescriptionChange(event) {
        this.setState({charCount: event.target.value.length});
        this.setState({description: event.target.value});
    }

    handleFileChange(event) {
        this.setState({file: event.target.value});
    }
    
    handleSubmit(event) {

        event.preventDefault();
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

    buildBody() {
        var longName;
        longName = this.state.courseInfo['name']
        if (longName === '') {
            longName = 'Unspecified'
        }

        var professor;
        professor = this.state.courseInfo['professor']
        if (professor === '') {
            professor = 'Unspecified'
        }

        return (
            <div className="submit_form">
                {!this.props.loggedIn &&
                    <Redirect push 
                        to={{
                            pathname: "/login",
                            state: { warning: 'You need to be logged in to submit.'}
                        }} />
                }
                <h2>Submission Page for {this.state.courseInfo['number']}</h2>
                <hr/>
                <div className="submit_info">
                    <h4>Course Title: {longName}</h4>
                    <h4>School: {this.state.courseInfo['school_name']}</h4>
                    <h4>Happened: {this.state.courseInfo['semester']} {this.state.courseInfo['year']}</h4>
                    <h4>Professor: {professor}</h4>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <FormField 
                        textArea
                        aside="optional"
                        label='Description'
                        placeholder="Put your description of what is in the submission here"
                        css_class="input"
                        handleFunc={this.handleDescriptionChange}/>
                    <span className='remaining_chars'>{String(this.state.charCount)}/500</span>
                    <h2>Choose Files to Upload</h2>
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>
                </form>
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
}

export default Submit;