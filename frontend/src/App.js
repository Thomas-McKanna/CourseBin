import './index.css'
import React from "react";
import { 
  BrowserRouter, 
  Route, 
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./header"
import SearchForm from "./search_form"
import SearchResults from "./search_results"
import SubmitInitial from "./submit_initial"
import Login from "./login"
import SignUp from "./signup"

function App() {
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
              <Route path='/login' component={Login} />
              <Route path='/signup' component = {SignUp} />
              <Route component={NotFound} />
            </Switch>
          </div>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function NotFound() {
  return <h2>Page Not Found.</h2>;
}

export default App;