import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import '../config';
import CardMovies from "./CardMovies";


const MyShare = () => {

  const [movies, setMovies] = useState([]);
  const [username, setUsername] = useState('');

  try {
    const configFetch = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    };
    fetch(global.config.urlRequest + '/user/getuser', configFetch)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.act === 'true') {
          setMovies(data.user.movies);
          setUsername(data.username);
        }
      });
  } catch (e) {
    console.log(e);

  }


  return (
    <Col md={12}>
      <Row>
        {
         movies.length > 0 ?
           movies.map((value, key) => {
             return <CardMovies key={key}
                                img={
                                  'https://image.tmdb.org/t/p/w500/' + value.img
                                }
                                title={value.title}
                                promo={value.origin_date}
                                sharing={['benzi']}
                                origin_date={value.origin_date}
                                cdate={value.cdate}
             />
           })
           :
           <Col md={12} className={''}>
            <Row className={'justify-content-center text-center  mt-4'}>
              <Col md={6} className={'alert alert-warning'}>
                You no have share my friend =[
              </Col>
            </Row>
           </Col>
        }
      </Row>
    </Col>
  )
};

export default MyShare;