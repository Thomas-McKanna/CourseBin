import './index.css'
import React from "react";
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./header"
import SearchForm from "./search/search_form"
import SearchResults from "./search/search_results"
import SubmitInitial from "./submit/add_course"
import Submission from "./submission/submission"
import Submit from "./submit/submit"
import Login from "./authentication/login"
import SignUp from "./authentication/signup"
import notFoundImg from "./images/404_not_found.jpg"
import Cookies from 'universal-cookie';

class App extends React.Component {

    state = {
        loggedIn: false,
    }

    constructor(props) {
        super(props);

        const cookies = new Cookies();
        if (cookies.get("auth")) {
            this.state.loggedIn = true;
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        const headerLinks = [
            {label: 'Search', link: '/search/form', float: 'left'},
            {label: 'Submit', link: '/add_course', float: 'left'},
        ]

        return (
        <BrowserRouter>
            <div id="outer_body">
                <Header 
                    id="navigation" 
                    items={headerLinks} 
                    loggedIn={this.state.loggedIn} />
                <div id="inner_body">
                    <Switch>
                        <Route path='/search/form' component={SearchForm} />
                        <Route path='/search' component={SearchResults} />
                        <Route path='/submit/:id'
                            render={(props) => 
                                <Submit 
                                    {...props} 
                                    loggedIn={this.state.loggedIn} />
                                }/>
                        <Route path='/add_course'
                            render={(props) => 
                                <SubmitInitial 
                                    {...props} 
                                    loggedIn={this.state.loggedIn} />
                                }/>
                        <Route path='/submissions/:id' 
                            render={(props) => 
                                <Submission 
                                    {...props} 
                                    loggedIn={this.state.loggedIn} />
                                }/>
                        <Route path='/login' 
                            render={(props) => 
                                <Login 
                                    {...props} 
                                    handleLogin={this.handleLogin} />
                                }/> />
                        <Route path='/signup' 
                            render={(props) => 
                                <SignUp 
                                    {...props} 
                                    handleLogin={this.handleLogin} />
                                }/> />
                        <Route path='/logout' 
                            render={(props) => 
                                <Logout 
                                    {...props} 
                                    handleLogin={this.handleLogin} />
                                }/> /> />
                        <Route exact path='/' component={Splash} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        );
    }

    generateNewUserNav() {
        return;
    }

    generateExistingUserNav() {
        return;
    }

    handleLogin(status) {
        this.setState({ loggedIn: status })
    }
}

function NotFound() {
    return (
        <div className="not_found">
            <center>
                <h2>Sorry about that...</h2>
                <img src={notFoundImg}/>
                <h2>The page could not be found.</h2>
            </center>
        </div>);
}


class Logout extends React.Component {

    render() {
        const cookies = new Cookies;
        cookies.remove("username");
        cookies.remove("auth");
        this.props.handleLogin(false);
        return (
            <Redirect push to='/' />);
    }
}

class Splash extends React.Component {

    render() {
        return (
            <div>
                <center>
                    <h2>Welcome to Backpack!</h2>
                    <p>Here you can search for content relating to the courses
                        you are taking. You can also submit content of your own
                        for others to download.
                    </p>
                    <button className="splash_button">
                        <Link to='/search/form'>Get Started!</Link>
                    </button>
                </center>
            </div>
        );

    }
}

export default App;