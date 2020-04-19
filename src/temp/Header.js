import React, { Component } from "react";
import { Button, Col, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Col xl={12} className={'p-0'}>
        <Navbar bg="dark" variant="dark" >

          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <NavLink exact className={'nav-link'} to="/" >Home</NavLink>
            <NavLink  className={'nav-link'} to="/ref" >ref</NavLink>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </Col>
    );
  }
}
export default Header;
