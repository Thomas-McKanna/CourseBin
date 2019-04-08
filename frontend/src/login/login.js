import React from "react";
import axios from "axios"
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: ''
        };
    
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
        console.log(event.target.value)
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
            </div>
        );
    }
}

export default Login;