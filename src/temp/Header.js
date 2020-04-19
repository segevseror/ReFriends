import React, { Component } from "react";
import { Button, Col, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Col xl={12} className={'p-0'}>
        <Navbar bg="dark" variant="dark" >

          <Navbar.Brand href="/">ReFriends</Navbar.Brand>
          <Nav className="mr-auto">
            <NavLink exact className={'nav-link'} to="/" >Home</NavLink>
            <NavLink  className={'nav-link'} to="/ref" >ref</NavLink>
          </Nav>
        </Navbar>
      </Col>
    );
  }
}
export default Header;
