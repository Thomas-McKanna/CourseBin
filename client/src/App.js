import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/api/v1/courses/1')
      .then(res => res.json())
      .then(users => console.log("hllo"));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div>{user}</div>
        )}
      </div>
    );
  }
}

export default App;