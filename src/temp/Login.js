import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {userNameState, loggedReducer} from "../actions";

function Login() {
    const dispatch = useDispatch();

    const [userName, setUser] = useState("");
    const [password, setPass] = useState("");
    const [errors, setErrors] = useState('');


    const submit = () => {

        if (!password || !userName) {
            setErrors('אחד מהפרטים אינו נכון')
            return false;
        }

        var data = new FormData();
        data.set('username' , userName);
        data.set('password' , password);
        var req = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
            },
            body: data
        };
         fetch('https://backend-api-segev.herokuapp.com/user/login', req).then(res => res.json()).then(result => {
             if(result.act == 'true'){
                 dispatch(loggedReducer());
                 dispatch(userNameState(userName));
                 setErrors('');
             }else{
                 setErrors('אחד מהפרטים אינו נכון')
             }
            console.log(result.act);
        });

        // dispatch(loggedReducer());
        // dispatch(userNameState(userName));
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
                        <Col md={12} className={'mb-3 text-danger'} hidden={!errors}>
                            {errors}
                        </Col>
                    </form>
                </Col>
            </Row>
        </Col>
    );
}

export default Login;
