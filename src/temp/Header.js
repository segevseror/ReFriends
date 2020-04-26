import React from "react";
import {Col, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOutReducer} from "../actions";
import '../config';
import auth from '../auth';




const LoginBox = (props) => {

  const logOut = () => {
    if (props.isLogged) {
      const configFetch = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      };
      fetch(global.config.urlRequest + '/user/logout', configFetch)
        .then(response => response.json())
        .then(data => {
          if (data === true) {
            props.dispatch(logOutReducer());
            auth.logout(() => {
              window.location.href = '/login'
            });

          }
        });

    }
  };
  return (
    <Nav>
      <NavLink exact className={"nav-link pr-0"} to={props.isLogged ? '/logOut' : '/logIn'} onClick={logOut}>
        {props.isLogged ? 'LogOut' : 'LogIn'}
      </NavLink>
      <NavLink hidden={props.isLogged} className={"nav-link pl-0"} to="/register">
        /Register
      </NavLink>
    </Nav>
  );
};

const Header = (props) => {
  const isLogged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <Col xl={12} className={"p-0"}>


      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ReFriends</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink exact className={"nav-link"} to="/">
              Home
            </NavLink>
            <NavLink className={"nav-link"} to="/ref">
              reference
            </NavLink>
            <NavLink exact className={"nav-link"} to="/myshare">
              My shares
            </NavLink>
            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
            {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*  <NavDropdown.Divider />*/}
            {/*  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
            {/*</NavDropdown>*/}
          </Nav>
          <Nav>
            <LoginBox dispatch={dispatch} isLogged={isLogged} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
}
export default Header;
