import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer, userNameState} from "../actions";
import { Router } from 'react-router-dom';
import '../config';
import auth from '../auth';
import history from '../history';

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

        const configFetch = {
            method: 'POST',
            body: formData,
            credentials: 'include',
            mode: 'cors'
        };

        fetch(global.config.urlRequest+'/user/login', configFetch)
            .then(response => response.json())
            .then(data => {
                if (data.act == 'true') {
                    dispatch(loggedReducer());
                    dispatch(userNameState(userName));
                    auth.login(()=>{})
                } else if(data.act == 'false') {
                    setErrorsMessage(data.message);
                    return false;
                }else{
                    setErrorsMessage('אחד מהפרטים אינו נכון');
                    return false;
                }
            });
    };

    const check = (e) => {
        const configFetch = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        };
        fetch(global.config.urlRequest+'/user/getuser', configFetch)
            .then(response => response.json())
            .then(data => {
                console.log('data check', data);

            }).catch((e) => {
            console.log('e', e);
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
