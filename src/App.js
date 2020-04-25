import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./temp/HomePage";
import Ref from "./temp/Ref";
import Login from "./temp/Login";
import MyShare from "./temp/MyShare";
import Header from "./temp/Header";
import {Col, Container, Row} from "react-bootstrap";
import "./App.css";
import {ProtectedRoute} from "./protected.route";
import {useDispatch} from "react-redux";
import {loggedReducer} from "./actions";
import auth from "./auth";
import Register  from './temp/Register';


// const header = {
//   method: 'GET',
//   credentials: 'include',
//   mode: 'cors'
// };
// const res = await fetch(global.config.urlRequest + '/user/getuser', header)
// const json = await res.json();
// console.log('response from api ' , json);

//


const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const header = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      };
      const res = await fetch(global.config.urlRequest + '/user/cheackuser', header);
      const json = await res.json();
      if (json.act === 'true') {
        auth.login(() => {});
        dispatch(loggedReducer());
      }
      setLoading(true);
    }
    fetchData()
  }, []);

  return {loading};

};

const App = () => {
  const {loading} = useFetch();

  return (
    <Router>
      <Container fluid className={"backgorund container-fluid"}>

        {loading ? <Row>
            <Header/>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <ProtectedRoute path="/ref" component={Ref}/>
              <ProtectedRoute path="/myshare" component={MyShare}/>
              <ProtectedRoute path="/" component={HomePage}/>
            </Switch>
          </Row> :
          <Col md={12} className={'mt5 mb-5 text-center text-align-center'}>
            Loading....
          </Col>
        }
      </Container>
    </Router>
  );
};


export default App;
