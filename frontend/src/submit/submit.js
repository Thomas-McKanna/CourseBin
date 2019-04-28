import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'


class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '', 
            file: '',
        };
     
        this.handledescriptionChange = this.handledescriptionChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handledescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleFileChange(event) {
        this.setState({file: event.target.value});
    }
    
    handleSubmit(event) {
        axios.post('/api/v1/users/login/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(function(response) {
            if (response.status === '200') {
                console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        event.preventDefault();
        console.log(this.props.location.state);
    }

    render() {
        return (
            <div>
                <center>
                    <h2>Submitting to </h2>
                    <p> 
                        Name {this.props.location.state['course_name']}, 
                        Number {this.props.location.state['course_number']}, 
                        School {this.props.location.state['course_school']}, 
                        Semester {this.props.location.state['course_semester']}, 
                        Year {this.props.location.state['course_year']}, 
                        Instructor {this.props.location.state['course_instructor']}
                    </p>
                </center>
                <form onSubmit={this.handleSubmit}>
                    <FormField 
                        input
                        label='Description'
                        placeholder="how u like"
                        css_class="input"
                        handleFunc={this.handledescriptionChange}/>
                    <FormField
                        input
                        label="(TODO)Files to upload"
                        placeholder=""
                        css_class="input"
                        handleFunc={this.handleFileChange}/>
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
            
        );
    }
}

export default Submit;