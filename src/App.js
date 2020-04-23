import React, {useEffect , useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./temp/HomePage";
import Ref from "./temp/Ref";
import Login from "./temp/Login";
import Header from "./temp/Header";
import {Col, Container, Row} from "react-bootstrap";
import "./App.css";
import {ProtectedRoute} from "./protected.route";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer} from "./actions";
import auth from "./auth";


// const header = {
//   method: 'GET',
//   credentials: 'include',
//   mode: 'cors'
// };
// const res = await fetch(global.config.urlRequest + '/user/getuser', header)
// const json = await res.json();
// console.log('response from api ' , json);

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(async () => {
    const header = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    };
    const res = await fetch(global.config.urlRequest + '/user/getuser', header)
    const json = await res.json();
    if (json.act === 'true') {
      dispatch(loggedReducer());
      auth.login(()=>{});
    }
    setLoading(true);
  }, []);

  return {loading};

};

const App = () => {
  const {loading} = useFetch();

  return (
    <Router>
      <Container className={"backgorund"}>

        {loading ? <Row>
            <Header/>
            <Switch>
              <Route path="/login" component={Login}/>
              <ProtectedRoute path="/ref" component={Ref}/>
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
