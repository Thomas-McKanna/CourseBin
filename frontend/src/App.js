import './index.css'
import React from "react";
import { 
  BrowserRouter, 
  Route, 
  Switch,
} from "react-router-dom";
import Header from "./header"
import SearchForm from "./search/search_form"
import SearchResults from "./search/search_results"
import SubmitInitial from "./submit/submit_initial"
import Submission from "./submission/submission"
import Login from "./login"
import SignUp from "./signup"

class App extends React.Component {

    state = {
        loggedIn: true, // set to false after debugging
    }

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

  render() {
    const headerLinks = [
      {label: 'Search', link: '/search/form', float: 'left'},
      {label: 'Submit', link: '/submit_initial/', float: 'left'},
      {label: 'Sign Up', link: '/signup/', float: 'right'},
      {label: 'Log In', link: '/login/', float: 'right'},
    ]

    return (
      <BrowserRouter>
        <div id="outer_body">
          <Header id="navigation" links={headerLinks}/>
            <div id="inner_body">
              <Switch>
                <Route path='/search/form' component={SearchForm} />
                <Route path='/search' component={SearchResults} />
                <Route path='/submit_initial' component={SubmitInitial} />
                <Route path='/submissions/:id' 
                    render={(props) => 
                        <Submission 
                            {...props} 
                            loggedIn={this.state['loggedIn']} />
                        }/>
                <Route path='/login' 
                    render={(props) => 
                        <Login 
                            {...props} 
                            handleLogin={this.handleLogin} />
                        }/> />
                <Route path='/signup' component = {SignUp} />
                <Route component={NotFound} />
              </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
  }

  handleLogin(status) {
      this.setState({ loggedIn: status })
  }

}



function NotFound() {
  return <h2>Page Not Found.</h2>;
}

export default App;