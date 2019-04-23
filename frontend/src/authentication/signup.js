import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'

class SignUp extends React.Component {
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
        event.preventDefault();
        if (this.state.username === "" || this.state.password === "") {
            console.log("Must input a username and password");
            return;
        }

        const self = this;
        // sign the user up     
        axios.post('/api/v1/users/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(function(response) {
            console.log(response.status)
            if (response.status === 201) {
                axios.post('/api/v1/users/login', {
                    username: self.state.username,
                    password: self.state.password
                })
                .then(function(response) {
                    if (response.status === 200) {
                        const cookies = new Cookies();
                        cookies.set('auth', response.data.token)
                        cookies.set('username', self.state.username)
                        self.props.handleLogin(true);
                        self.props.history.goBack();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log("Username already exists.")
        })
    }

    render() {
        return (
            <div className="signup_form">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormField 
                        input
                        label="Username"
                        placeholder=""
                        css_class="input"
                        handleFunc={this.handleUsernameChange}/>
                    <FormField
                        input
                        label="Password"
                        placeholder=""
                        css_class="input"
                        handleFunc={this.handlePasswordChange}/>
                    <SubmitButton
                        label="Sign Up"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default SignUp;