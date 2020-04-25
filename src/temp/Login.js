import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer, userNameState} from "../actions";
import { Redirect } from 'react-router-dom';
import '../config';
import auth from '../auth';

function Login() {
    const dispatch = useDispatch();
    const [userName, setUser] = useState("");
    const [password, setPass] = useState("");
    const [errorsMessage, setErrorsMessage] = useState("");
    const [redirect , setRedirect] = useState(false);

    const submit = () => {
        if (!userName || !password) {
            setErrorsMessage('יש להזין את כל הפרטים');
            return false;
        }
        var formData = new FormData();
        formData.append('password', password);
        formData.append('username', userName);

        const configFetch = {
            method: 'POST',
            body: formData,
            credentials: 'include',
            mode: 'cors'
        };
        fetch(global.config.urlRequest+'/user/login', configFetch)
            .then(response => response.json())
            .then(data => {
                if (data.act === 'true') {
                    dispatch(loggedReducer());
                    dispatch(userNameState(userName));
                    auth.login(()=>{});
                    setRedirect(true);
                } else if(data.act === 'false') {
                    setErrorsMessage(data.message);
                    return false;
                }else{
                    setErrorsMessage('אחד מהפרטים אינו נכון');
                    return false;
                }
            });
    };

    const isLogged = useSelector(state => state.logged);


    return (
        <Col md={12}>
            <Row className={"justify-content-center text-center"}>
                <Col md={3}>
                    <form>
                        {redirect ? <Redirect to={'/'}/>  : ''}
                        <Col hidden={!(userName !== '' && isLogged)}>
                            Hello {userName}
                        </Col>
                        <div hidden={isLogged}>
                            <Col md={12} className={'mt-3'}>
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
                                    type={'password'}
                                    fullWidth
                                    label="Password"
                                    onChange={e => {
                                        setPass(e.target.value);
                                    }}
                                />
                            </Col>
                            <Col md={12} className={"mt-3 mb-3"}>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  color="secondary"
                                  onClick={submit}
                                >
                                    Connect
                                </Button>
                            </Col>
                        </div>

                        <Col className={'text-danger mb-3'}>
                            {errorsMessage}
                        </Col>
                    </form>
                </Col>
            </Row>
        </Col>
    );
}

export default Login;
