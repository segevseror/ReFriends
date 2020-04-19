import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

const CardMovies = props => {
  const CardDetailesRow = props => {
    const shereFriendsTitle = {
      fontSize: "13px",
      borderBottom: "1px solid rgba(0,0,0,.125)",
      paddingTop: "15px",
      paddingBottom: "15px",
      alignItems: "center"
    };

    var details = "";
    if (Array.isArray(props.data)) {
      details = props.data.map(function(value, key) {
        return <span key={key}>{value}, </span>;
      });
    } else {
      details = props.data;
    }
    return (
      <Col md={12}>
        <Row style={shereFriendsTitle}>
          <Col className={"pr-0"}>
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
    <Col md={4} xs={6} className={"pt-2 pb-2"}>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <img src={props.img} className={"img-fluid"} />
            </Col>
            <Col md={6} className={"pl-md-0"}>
              <Row className={"h-100"}>
                <Col md={12}>
                  <Row>
                    <Col md={12}>
                      <h4>
                        <b>{props.title}</b>
                      </h4>
                    </Col>
                    <Col md={12}>
                      <p>{props.promo}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={12} style={detailsbox}>
                  <Row>
                    <CardDetailesRow title={"sharing"} data={["segev"]} />
                    <CardDetailesRow title={"Last Update"} data={"20/20/20"} />
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
  componentDidMount() {
    document.title = `Share With Friends`;
  }
  render() {
    return (
      <Col md={12}>
        <Row>
          <CardMovies
            img={
              "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg"
            }
            title={"Movies 1"}
            promo={"on the movies"}
            data={["ness", "segev"]}
          />

          <CardMovies
            img={
              "https://m.media-amazon.com/images/M/MV5BMTNmMjAxMDItMTdmYS00ZmZmLWI3YjEtMDI1OGU0MTgwMjc4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
            }
            title={"Movies 2"}
            promo={"on the movies"}
            data={["ness", "segev"]}
          />
          <CardMovies
            img={
              "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg"
            }
            title={"Movies 3"}
            promo={"on the movies"}
            data={["ness", "segev"]}
          />
        </Row>
      </Col>
    );
  }
}
export default Ref;
