import React, {Component} from "react";
import {Col, Row, Spinner} from "react-bootstrap";
import CardMovies from './CardMovies';


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
                                this.state.movies.map((value, key) => {
                                    return <CardMovies key={key}
                                                       img={
                                                           'https://image.tmdb.org/t/p/w500/' + value.img
                                                       }
                                                       title={value.title}
                                                       promo={value.origin_date}
                                                       sharing={[...value.sharing]}
                                                       origin_date={value.origin_date}
                                                       cdate={value.cdate}
                                                       movies_id={value.id_movies}
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
