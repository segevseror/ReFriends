import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer, userNameState} from "../actions";

function Login() {
    const dispatch = useDispatch();

  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");
  const [errorsMessage, setErrorsMessage] = useState("");

  const submit = () => {

    if (!userName || !password) {
      setErrorsMessage('יש להזין את כל הפרטים');
      return false;
    }

    var formData = new FormData();
    formData.append('password', password);
    formData.append('username', userName);

    const checkUserReq = {
      method: 'POST',
      body: formData
    };
    fetch('http://netflixbackend.x/user/login', checkUserReq)
      .then( response => response.json())
      .then(data => {
        console.log('data', data);
        if (data.act == 'true') {
          dispatch(loggedReducer());
          dispatch(userNameState(userName));
        } else {
          setErrorsMessage('אחד מהפרטים אינו נכון');
          return false;
        }
      });
  };

  const check = (e) => {
    fetch('http://netflixbackend.x/user/getuser', {method: 'GET'})
      .then( response => response.json())
      .then(data => {
        console.log('data check', data);

      }).catch((e) => {
        console.log('e' , e);
    })
  };
  const isLogged = useSelector(state => state.logged);

  return (
    <Col md={12}>
      <Row className={"justify-content-center text-center"}>
        <Col md={3}>
          <form>
            <Col hidden={!(userName != '' && isLogged)}>
              Hello {userName}
            </Col>
            <div hidden={isLogged}>
              <Col md={12}>
                <h3>
                  <b>Login</b>
                </h3>
              </Col>
              <Col md={12}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="UserName"
                  onChange={e => {
                    setUser(e.target.value);
                  }}
                />
              </Col>
              <Col md={12}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Password"
                  onChange={e => {
                    setPass(e.target.value);
                  }}
                />
              </Col>
            </div>
            <Col md={12} className={"mt-3 mb-3"}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={submit}
              >
                Secondary
              </Button>
            </Col>
            <Col className={'text-danger mb-3'}>
              {errorsMessage}
            </Col>
          </form>
        </Col>
        <Col md={12}>
          <button onClick={check}>click check</button>
        </Col>
      </Row>
    </Col>
  );
}

export default Login;
