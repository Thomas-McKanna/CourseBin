import './index.css'
import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  NavLink, 
  Switch
} from "react-router-dom";
import Login from './login/login';

function App() {
  const headerLinks = [
    {label: 'Home', link: '/', float: 'left'},
    {label: 'Search', link: '/search/', float: 'left'},
    {label: 'Submit', link: '/submit/', float: 'left'},
    {label: 'Sign Up', link: '/signup/', float: 'right'},
    {label: 'Log In', link: '/login/', float: 'right'},
  ]

  return (
    <Router>
      <div>
        <Header id="navigation" links={headerLinks}/>
        <Switch>
          <Route path='/search' component={Search} />
          <Route path='/submit' component={Submit} />
          <Route path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
        
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function NotFound() {
  return <h2>Page Not Found.</h2>;
}


function Search() {
  return <h2>Search Page</h2>;
}

function Submit({ match }) {
  return <h2>Submit Page</h2>;
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.links = props.links.map((item) => 
      <HeaderLink key={item.label}
        link={item.link}
        label={item.label} 
        float={item.float} />
    );
  }

  render() {
    return (
      <div>
        <ul id='menu'>
          <li id='logo'>CourseBin</li>
          {this.links}
        </ul>
      </div>
    );
  }
}

class HeaderLink extends React.Component {
  render() {
    return (
      <li className={this.props.float}>
        <NavLink to={this.props.link}>
          {this.props.label}
        </NavLink>
      </li>
    );
  }
}

export default App;