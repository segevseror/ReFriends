import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import {white} from "color-name";
import styled from 'styled-components/macro';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const CardMovies = props => {



    const CardDetailesRow = props => {
        const shereFriendsTitle = {
            fontSize: "13px",
            alignItems: "center"
        };
        var details = "";
        if (Array.isArray(props.data)) {
            details = props.data.map(function (value, key) {
                return <span key={key}> {value}{(key != props.data.length - 1 ? ',' : '')} </span>;
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
                    <Col
                        className={Array.isArray(props.data) ? 'text-right' : '"text-md-right text-left"'}>{details}</Col>
                </Row>
            </Col>
        );
    };

    const detailsbox = {
        alignSelf: "flex-end",
        paddingBottom: "15px",
    };
    const boxnovies = {
        background: 'black',
        color: 'white',
        borderRadius: '5px',
        overflow: 'hidden',
        // border: '1px solid #e3e3e3',
        boxShadow: 'rgba(255, 255, 255, 0.99) 0px 2px 8px',
        height: '100%'
    };
    const promoStyle = {
        fontSize: '13px',
        color: '#79ebff'
    };
    const titleStyle = {
        color: '#79ebff'
    };
    const ImgStyle = styled.div`
    min-height: 431px;
    @media screen and (max-width: 480px) {
       min-height: 250px;
    }
     `;
    const AddFevorStyle = styled.div`
       position: absolute;
        right: 7%;
        top: 1%;
        height: 28px;
        width: 28px;
        z-index: 9;
        //background: #878585;
        //border-radius: 50%;
        //text-align: center;
        //align-items: center;
     `;

    const fevorite = [];
    const [fevor , setFevor] = useState([]);

    const handleChange = (event) => {
        if(event.target.value){

        }
        fevorite.push();
        setFevor(fevorite);
        console.log(fevor);

    };


    return (
        <Col xl={2} md={3} xs={6} className={'mt-4'}>
            <Row className={"m-0"} style={boxnovies}>
                <AddFevorStyle>
                    <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" onChange={handleChange} />}
                        label=""
                    />
                </AddFevorStyle>
                <Col md={12}>
                    <Row className={'h-100'}>
                        <ImgStyle md={12} className={'p-0'}>
                            <img alt={'img'} src={props.img} className={"w-100"}/>
                        </ImgStyle>
                        <Col md={12} className={"mt-2"}>
                            <Row className={"h-100"}>
                                <Col md={12} style={titleStyle}>
                                    <b>{props.title}</b>
                                </Col>
                                <Col md={12} style={promoStyle}>
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
