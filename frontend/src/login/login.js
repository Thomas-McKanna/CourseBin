import Cookies from 'universal-cookie';
import React from "react";
import axios from "axios"
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
            submission: '',
        };
    
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmissionChange = this.handleSubmissionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmissionSubmit = this.handleSubmissionSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleSubmissionChange(event) {
        this.setState({submission: event.target.value});
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
    }

    handleSubmissionSubmit(event) {
        const cookies = new Cookies();
        console.log(this.state.submission);
        axios.post('/api/v1/submissions/course/1', {
            description: this.state.submission,
        }, {
            headers: {'Authorization': "bearer " + cookies.get('auth')}
        })
        .then(function(response) {
            if (response.status === '200') {
                console.log(response);
            }
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" onChange={this.handleUsernameChange} />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" onChange={this.handlePasswordChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmissionSubmit}>
                    <label>
                        submission description:
                        <input type="text" onChange={this.handleSubmissionChange} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default Login;