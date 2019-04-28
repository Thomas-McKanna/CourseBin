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
            username: '', 
            password: '',
        };
    
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
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
        console.log(this.props.location.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormField 
                        input
                        label='Description'
                        placeholder="how u like"
                        css_class="input"
                        handleFunc={this.handleUsernameChange}/>
                    <FormField
                        input
                        label="(TODO)Files to upload"
                        placeholder=""
                        css_class="input"
                        handleFunc={this.handlePasswordChange}/>
                    <SubmitButton
                        label="Submit"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
            
        );
    }
}

export default Submit;