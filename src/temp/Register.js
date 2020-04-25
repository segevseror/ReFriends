import React, {useState} from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {loggedReducer} from "../actions";
import '../config';
import auth from '../auth';

const initState = {
  userNameArr :'',
  emailArr:'',
  passwordArr:'',
  whatsappArr: ''
};


function Register(props) {
  const dispatch = useDispatch();
  const [{userNameArr , emailArr , passwordArr , whatsappArr } , setState] = useState(initState) ;
  const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [repassword, setRepassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errorsMessage , setErrorsMessage] = useState('');
  const [loading , setLoading] = useState(false);


  const submit = () => {
    setErrorsMessage('');
    setState(state => ({
      ...initState
    }));
    let  validation =false;
    if (!userName) {
      setState(state => ({
        ...state , ['userNameArr'] : 'UseName Must be filled'
      }));
      validation = true;
    }
    if (!email) {
      setState(state => ({
       ...state , ['emailArr'] : 'Email Must be filled'
      }));
      validation = true;
    }
    if (!password || password.length < 4 || !repassword || password != repassword) {
      setState(state => ({
        ...state , ['passwordArr'] : 'Password Must be filled OR same OR 4+ chars '
      }));
      validation = true;
    }
    if (whatsapp !== '18') {
      setState(state => ({
        ...state , ['whatsappArr'] : 'The Number does not match group members'
      }));
      validation = true;
    }

    if(validation){
      return false;
    }


    var formData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('passAdmin', '8889');
    const configFetch = {
      method: 'POST',
      body: formData,
      credentials: 'include',
      mode: 'cors'
    };
    setLoading(true);
    fetch(global.config.urlRequest+'/user/adduser', configFetch)
      .then(response => response.json())
      .then(data => {
        if (data.act === 'true') {
          dispatch(loggedReducer());
          auth.login(()=>{});
          props.history.push('/');
        }else{
          setErrorsMessage(data.message);
        }
        setLoading(false);
        return false;
      });
  };


  const isLogged = useSelector(state => state.logged);


  return (
    <Col md={12}>
      <Row className={"justify-content-center text-center"}>
        <Col md={12} hidden={!loading}>
          <Spinner animation="border" variant="success mt-3"/>
        </Col>
        <Col xl={3} md={6} sm={12} hidden={loading}>
          <form className={'row'}>
            <Col hidden={isLogged}>
              <Row>
                <Col md={12} className={'mt-3'}>
                  <h3>
                    <b>Register</b>
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
                <Col md={12} className={'mt-1 text-left text-danger'} style={{fontSize:'11px' , fontWeight:600}}>
                  {userNameArr}
                </Col>
                <Col md={12}>
                  <TextField
                    id="standard-basic"
                    fullWidth
                    label="Email"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
                <Col md={12} className={'mt-1 text-left text-danger'} style={{fontSize:'11px' , fontWeight:600}}>
                  {emailArr}
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
                <Col md={12}>
                  <TextField
                    id="standard-basic"
                    type={'password'}
                    fullWidth
                    label="Re-enter password"
                    onChange={e => {
                      setRepassword(e.target.value);
                    }}
                  />
                </Col>
                <Col md={12} className={'mt-1 text-left text-danger'} style={{fontSize:'11px' , fontWeight:600}}>
                  {passwordArr}
                </Col>
                <Col md={12}>
                  <TextField
                    id="standard-basic"
                    fullWidth
                    label="how much members have in whatsapp?"
                    onChange={e => {
                      setWhatsapp(e.target.value);
                    }}
                  />
                </Col>
                <Col md={12} className={'mt-1 text-left text-danger'} style={{fontSize:'11px' , fontWeight:600}}>
                  {whatsappArr}
                </Col>
              </Row>
            </Col>
            <Col md={12} className={'alert alert-warning mt-2'} hidden={!errorsMessage}>
              {errorsMessage}
            </Col>
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
          </form>
        </Col>
      </Row>
    </Col>
  );
}

export default Register;
