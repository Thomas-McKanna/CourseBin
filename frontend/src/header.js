import Cookies from 'universal-cookie';
import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.items = props.items.map((item) => 
            <HeaderLink key={item.label}
                link={item.link}
                label={item.label} 
                float={item.float} />
        );
    }
  
    render() {
        const cookies = new Cookies();
        return (
            <div id="outer_header">
            <div id="inner_header">
                <ul id='menu'>
                <a href='/'><li id='logo'>CourseBin</li></a>
                {this.items}
                {this.props.loggedIn &&
                    this.makeHeaderLink('/logout', 'Log Out', 'right')}
                {this.props.loggedIn &&
                    this.makeHeaderLabel('Hello, ' + cookies.get('username'), 'right')}
                {!this.props.loggedIn &&
                    this.makeHeaderLink('/login', 'Login', 'right')}
                {!this.props.loggedIn &&
                    this.makeHeaderLink('/signup', 'Sign Up', 'right')}
                </ul>
            </div>
            <div id="header_separator"/>
            </div>
        );
    }

    makeHeaderLink(link, label, float) {
        return (
            <HeaderLink key={label}
                link={link}
                label={label} 
                float={float} />
        );
    }

    makeHeaderLabel(label, float) {
        return (
            <span>
                <HeaderLabel float={float} label={label} />
            </span>
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

class HeaderLabel extends React.Component {
    render() {
      return (
        <li className={this.props.float}>
            <div className='nav_label'>{this.props.label}</div>
        </li>
      );
    }
}

export default Header;