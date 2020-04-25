import React from "react";
import {Col, Nav, Navbar} from "react-bootstrap";
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
        {props.isLogged ? 'LogOut' : 'LogIn'}/
      </NavLink>
      <NavLink hidden={props.isLogged} className={"nav-link pl-0"} to="/register">
        Register
      </NavLink>
    </Nav>
  );
};

const Header = (props) => {
  const isLogged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <Col xl={12} className={"p-0"}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">ReFriends</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink exact className={"nav-link"} to="/">
            Home
          </NavLink>
          <NavLink className={"nav-link"} to="/ref">
            reference
          </NavLink>
        </Nav>
        <LoginBox dispatch={dispatch} isLogged={isLogged} />
      </Navbar>
    </Col>
  );
}
export default Header;
