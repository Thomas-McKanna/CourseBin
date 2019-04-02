import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'

function App() {
  return (
    
    <Navbar bg="success" variant="dark">
    <Container>
    <Navbar.Brand href="#home">CourseBin</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav">
          <li className="nav-title">Nav Title</li>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </nav>
      <button className="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>
  );
}

export default App;