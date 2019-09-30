// import React, { Component, Fragment } from 'react';
// import Link from 'next/link';
// import { Link as NextLink } from '../../routes'

// class Header extends Component {
//     render() {
//         const title = this.props.title;
//         return (
//             <Fragment>
//                 <Link href="/"><a>Home</a></Link>
//                 <Link href="/about"><a>About</a></Link>
//                 <Link href="/portfolios"><a>Portfolios</a></Link>
//                 <Link href="/blog"><a>Blog</a></Link>
//                 <Link href="/cv"><a>CV</a></Link>
//                 <NextLink route='test' params={{id: '2'}}> Test2 </NextLink>
//                 <NextLink route='/test/5'> Test5 </NextLink>
//                 <style jsx>
//                     {`
//                         a{
//                             font-size: 20px;
//                         };
//                         .customClass{
//                             color: red;
//                         }
//                     `}
//                 </style>
//             </Fragment>
//         );
//     }
// }

// export default Header;

import React, { Component } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

const BsNavLink = (props) => {

    const { route, title } = props;

    return (
        <Link href={route}><a className="nav-link port-navbar-link">{title}</a></Link>
    )
}

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
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
                <BsNavLink route='/blog' title="Blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink route='/cv' title="Cv" />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}