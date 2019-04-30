import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './style.css'
import FormField from '../util/form_field'
import SubmitButton from '../util/submit_button'
import Warning from '../util/warning'

class Login extends React.Component {

    state = {
        username: '', 
        password: '',
    }

    constructor(props) {
        super(props);

        if (props.location.state != undefined) {
            this.state = { hasWarning: true }
        } else {
            this.state = { hasWarning: false }
        }
    
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
        var self = this; // bind "this" so that callbacks can use it    
        axios.post('/api/v1/users/login/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(function(response) {
            if (response.status === 200) {
                const cookies = new Cookies();
                cookies.set('auth', response.data.token);
                cookies.set('username', self.state.username)
                self.props.handleLogin(true);
                self.props.history.goBack();
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="login_form">
                {this.state.hasWarning &&
                    <Warning 
                        msg={this.props.location.state.warning}
                    />
                }
                <h2>Log In</h2>
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
                        label="Log In"
                        handleFunc={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default Login;