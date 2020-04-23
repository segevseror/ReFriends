import React from "react";
import {Col, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOutReducer} from "../actions";
import '../config';
import auth from '../auth';

const LoginBox = (props) => {
  const isLogged = useSelector(state => state.logged);
  console.log('isLogged?' , isLogged);



  const logOut = () => {
    if (isLogged) {
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
    <div>
      <NavLink exact className={"nav-link"} to={isLogged ? '/logOut' : '/logIn'} onClick={logOut}>
        {isLogged ? 'LogOut' : 'LogIn'}
      </NavLink>
    </div>
  );
};

const Header = (props) => {
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
        <LoginBox dispatch={dispatch}/>
      </Navbar>
    </Col>
  );
}
export default Header;
