import React, { Component } from 'react';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
        Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import auth0 from '../../services/auth0';


const BsNavLink = (props) => {

    const { route, title } = props;
    const className = props.className || '';

    return (
        <ActiveLink activeClassName="active" route={route}>
          <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
        </ActiveLink>
    )
}

const Login = () => {
    return (
        <span  onClick={auth0.login} className="nav-link port-navbar-link clickable"> Login </span>
    )
}

const Logout = () => {
    return (
        <span onClick={auth0.logout} className="nav-link port-navbar-link clickable"> Logout </span>
    )
}

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  renderBlogMenu(){
    const { isSiteOwner } = this.props;

    if(isSiteOwner){
      return (
        <Dropdown className="port-navbar-link port-dropdown-menu" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle nav caret className="port-dorpdown-toggle">
            Blog
            </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> 
              <BsNavLink className="port-dropdown-item" route='/blog' title="Blogs" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item" route='/blogEditor' title="Create a Blog" />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink className="port-dropdown-item" route='/blog' title="Blogs Dashboard" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )
    } else 
      return (
        <BsNavLink route='/blog' title="Blog" />
      )
  }

  render() {

    const { isAuthenticated, user, className } = this.props;
    const { isOpen } = this.state;

    const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

    return (
      <div>
        <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Mahaboob Basha</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink route='/' title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route='/about' title="About" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route='/portfolios' title="Portfolio" />
              </NavItem>
              <NavItem className="port-navbar-item">
                {this.renderBlogMenu()}
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route='/cv' title="Cv" />
              </NavItem>
              {
                !isAuthenticated  &&
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              }
              {
                isAuthenticated &&
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}