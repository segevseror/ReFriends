import React from "react";
import {Col, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer, logOutReducer, userNameState} from "../actions";
import '../config';
import auth from '../auth';

const LoginBox = (props) => {
    const isLogged = useSelector(state => state.logged);
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
                    if (data == true) {
                        auth.logout(() => {});
                        props.dispatch(logOutReducer());
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

    const configFetch = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    };
    fetch(global.config.urlRequest + '/user/getuser', configFetch)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            if (data.act == 'true') {
                dispatch(loggedReducer());
            } else {
            }
        });


    return (
        <Col xl={12} className={"p-0"}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">ReFriends</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink exact className={"nav-link"} to="/">
                        Home
                    </NavLink>
                    <NavLink className={"nav-link"} to="/ref">
                        ref
                    </NavLink>
                </Nav>
                <LoginBox dispatch={dispatch}/>
            </Navbar>
        </Col>
    );
}
export default Header;
