import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./temp/HomePage";
import Ref from "./temp/Ref";
import Header from "./temp/Header";
import { Container, Row } from "react-bootstrap";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Container className={"backgorund"}>
        <Row >
          <Header />
          <Switch>
            <Route path="/test">
              <div>
              </div>
            </Route>
            <Route path="/ref" >
              <Ref />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}
