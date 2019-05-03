import React from "react";
import axios from "axios";
import './style.css';
import FormField from '../util/form_field';
import SubmitButton from '../util/submit_button';
import { Redirect } from "react-router-dom";
import LoadingGIF from '../images/loading.gif';
import Tip from '../util/tip';
import Warning from '../util/warning'
import Cookies from 'universal-cookie';

class Submit extends React.Component {

    state = {
        contentLoaded: false,
        description: '',
        charCount: 0,
        hasWarning: false,
        submissionWasMade: false,
    }

    constructor(props) {
        super(props);
     
        this.fileInput = React.createRef();
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        var self = this; // bind "this" so that callbacks can use it
        axios.get('/api/v1/submissions/' + this.props.match.params['id'])
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
        var description = event.target.value;
        console.log(event)
        // NOT WORKING
        if (description.length > 500) {
            event.preventDefault();
        }
        this.setState({charCount: description.length});
        this.setState({description: description});
    }
    
    handleSubmit(event) {
        // Make the submissioni (just description) and get returned id
        // Use returned id to using the upload API call
        event.preventDefault();
        if (this.fileInput.current.files.length === 0) {
            this.setState({
                hasWarning: true,
                warning: 'Must select at least one file to submit.',
            })
            return
        }

        var self = this; // bind "this" so that callbacks can use it
        const cookies = new Cookies();
        axios.post('/api/v1/submissions/course/' + this.props.match.params['id'], 
            { description: this.state.description },
            { headers: { "Authorization": `bearer ${cookies.get('auth')}` }
        })
        .then(function(response) {
            if (response.status === 200) {
                self.setState({submissionId: response.data.result['insertId']});

                var bodyFiles  = new FormData();
                const files = self.fileInput.current.files;
                for (var i = 0; i < files.length; i++) {
                    bodyFiles.append('file', files[i], files[i].name)
                    const cookies = new Cookies();
                    axios({
                        method: 'post',
                        url: '/api/v1/upload/submission/' + self.state.submissionId,
                        data: bodyFiles,
                        headers: { "Authorization": `bearer ${cookies.get('auth')}` },
                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
                        .then(function (response) {
                            //handle success
                            self.setState({submissionWasMade: true})
                            console.log(response);
                        })
                        .catch(function (response) {
                            //handle error
                            self.setState({
                                hasWarning: true,
                                warning: 'A server problem has preventing the content upload from happening.'
                            })
                        });             
                }
            }
        })
        .catch(function (error) {
            console.log(error);
            self.setState({
                hasWarning: true,
                warning: 'Hmmmmm... either you have already submitted for this course or the server just exploded.'
            })
        });
        
    }

    handleFile(event, files) {
        // match filename based on size of file
        var filename;
        for (var i = 0; i < files.length; i++) {
            if (files[i].size === event.total) {
                filename = files[i].name;
            }
        }

        console.log(filename)
        var bodyFiles = new FormData();
        bodyFiles.append('file', event.target.result, filename)
        console.log(bodyFiles.getAll('file'))

        const cookies = new Cookies();
        var self = this; // bind "this" so that callbacks can use it
        axios({
            method: 'post',
            url: '/api/v1/upload/submission/' + self.state.submissionId,
            data: bodyFiles,
            headers: { "Authorization": `bearer ${cookies.get('auth')}` },
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(self.fileInput);
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
                {this.state.submissionWasMade && 
                    <Redirect push 
                        to={{
                            pathname: "/submissions/" + this.state.submissionId,
                        }} />
                }
                <h2>Submission Page for {this.state.courseInfo['number']}</h2>
                <hr/>
                <div className="submit_info">
                    <h4>Course Title: {longName}</h4>
                    <h4>School: {this.state.courseInfo['school_name']}</h4>
                    <h4>Semester: {this.state.courseInfo['semester']} {this.state.courseInfo['year']}</h4>
                    <h4>Professor: {professor}</h4>
                </div>
                <form className="upload_form" onSubmit={this.handleSubmit}>
                    <FormField 
                        textArea
                        aside="optional"
                        label='Description'
                        placeholder="Put your description of what is in the submission here"
                        css_class="input"
                        handleFunc={this.handleDescriptionChange}/>
                    <span className='remaining_chars'>{String(this.state.charCount)}/500</span>
                    <h2>Choose Files to Upload</h2>
                    <Tip tip='Multiple files can be selected. Consider putting everything in one zip file.' />
                    <input 
                        type="file"
                        multiple
                        ref={this.fileInput} />
                    {this.state.hasWarning &&
                        <Warning 
                            msg={this.state.warning}
                        />
                    }
                    <SubmitButton
                        label="Create Submission"
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