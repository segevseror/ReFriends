import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./temp/HomePage";
import Ref from "./temp/Ref";
import Login from "./temp/Login";
import Header from "./temp/Header";
import {Container, Row} from "react-bootstrap";
import "./App.css";
import {ProtectedRoute} from "./protected.route";
import history from './history';

function createBrowserHistory() {
    return undefined;
}

class App extends Component {

    constructor(props) {
        super(props);
        const history = createBrowserHistory();
    }

    render() {
        return (
            <Router>
                <Container className={"backgorund"}>
                    <Row>
                        <Header/>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <ProtectedRoute path="/ref" component={Ref}/>
                            <ProtectedRoute path="/" component={HomePage}/>
                        </Switch>
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default App;
