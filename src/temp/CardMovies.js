import {Col, Row} from "react-bootstrap";
import React from "react";

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
        return <span key={key}> {value}{(key != props.data.length - 1 ? ',' : '' )} </span>;
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

export default CardMovies;