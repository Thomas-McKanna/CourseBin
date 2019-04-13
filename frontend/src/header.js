import React from "react";
import {NavLink} from "react-router-dom";

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
        <div id="outer_header">
          <div id="inner_header">
            <ul id='menu'>
              <li id='logo'>CourseBin</li>
              {this.links}
            </ul>
          </div>
          <div id="header_separator"/>
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

export default Header;