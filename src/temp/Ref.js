import React, {Component} from "react";
import {Col, Row, Spinner} from "react-bootstrap";

const CardMovies = props => {
  const CardDetailesRow = props => {
    const shereFriendsTitle = {
      fontSize: "13px",
      borderTop: "1px solid rgba(0,0,0,.125)",
      paddingTop: "15px",
      paddingBottom: "15px",
      alignItems: "center"
    };
    var details = "";
    if (Array.isArray(props.data)) {
      details = props.data.map(function (value, key) {
        return <span key={key}>{value} {(key != props.data.length - 1 ? ',' : '' )} </span>;
      });
    } else {
      details = props.data;
    }
    return (
      <Col md={12}>
        <Row style={shereFriendsTitle}>
          <Col className={"pr-0 col-auto"}>
            <b>{props.title}</b>
          </Col>
          <Col className={"text-right"}>{details}</Col>
        </Row>
      </Col>
    );
  };

  const detailsbox = {
    alignSelf: "flex-end"
  };



  return (
    <Col xl={2} md={3} xs={6} className={'mt-4'}>
      <Row className={" boxnovies m-0"}>
        <Col md={12}>
          <Row className={'h-100'}>
            <Col md={12} className={'p-0'}>
              <img alt={'img'} src={props.img} className={"w-100"}/>
            </Col>
            <Col md={12} className={"mt-2"}>
              <Row className={"h-100"}>
                <Col md={12}>
                  <b>{props.title}</b>
                </Col>
                <Col md={12}>
                  <p>{props.promo}</p>
                </Col>
                <Col md={12} style={detailsbox}>
                  <Row>
                    <CardDetailesRow title={"sharing"} data={props.sharing}/>
                    <CardDetailesRow title={"Last Update"} data={props.cdate}/>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

class Ref extends Component {


  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };


    try {
      const configFetch = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      };
      fetch(global.config.urlRequest + '/user/getmovies', configFetch)
        .then(response => response.json())
        .then(data => {
          if (data.act === 'true') {
            this.setState(state => ({
              movies: Object.values(data.allmovies)
            }))
          }
        });
    } catch (e) {

    }

  }


  componentDidMount() {
    document.title = `Share With Friends`;
  }

  render() {
    return (
      <Col md={12}>
        <Row>
          <Col md={12} className={'text-center mt-3'} hidden={this.state.movies.length > 0}>
            <Spinner animation="border" variant="success mt-3"/>
          </Col>
          <Col md={12} hidden={this.state.movies.length === 0}>
            <Row>
              {
                this.state.movies.map((value) => {
                  console.log('logg' , value)
                  return <CardMovies
                    img={
                      'https://image.tmdb.org/t/p/w500/'+value.img
                    }
                    title={value.title}
                    promo={value.origin_date}
                    sharing={[...value.sharing]}
                    origin_date={value.origin_date}
                    cdate={value.cdate}
                  />
                })
              }
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Ref;
