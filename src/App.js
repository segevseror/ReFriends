import React, {Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./temp/HomePage";
import Ref from "./temp/Ref";
import Login from "./temp/Login";
import Header from "./temp/Header";
import {Container, Row} from "react-bootstrap";
import "./App.css";
import {loggedReducer, userNameState} from "./actions";

class App extends Component  {

  constructor(props){
    super(props);


    // const checkUserReq = {
    //   method: 'GET',
    // };
    // fetch('http://netflixbackend.x/user/getuser', checkUserReq)
    //   .then(async response => response.json())
    //   .then(data => {
    //     console.log('data', data);
    //     if (data.act == 'true') {
    //     } else {
    //       return false;
    //     }
    //   });

  }
  render() {
    return (
      <Router>
        <Container className={"backgorund"}>
          <Row>
            <Header/>
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/ref">
                <Ref/>
              </Route>
              <Route path="/">
                <HomePage/>
              </Route>
            </Switch>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;