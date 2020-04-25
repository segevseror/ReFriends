import React, {Component} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";
import '../config';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResult: [],
      dataSearch: {},
      moviesShareMassage: {text: '', type: ''},
      submit: true,
      inputValue: ''
    };
  }

  handleSearch = event => {
    var textSearch = event.target.value;
    if (textSearch) {
      const url =
        "https://api.themoviedb.org/3/search/multi?api_key=3af811a7bfa23c0cd16d2f99cd1b283d&language=en-US&query=" +
        event.target.value +
        "&page=1&include_adult=false";
      fetch(url)
        .then(res => res.json())
        .then(
          result => {
            if (result.results) {
              const resultSearch = result.results
                .filter(function (value) {
                  if (value.original_name || value.title) {
                    return true;
                  }
                  return false;
                })
                .map(function (value) {
                  return {
                    movieId: value.id,
                    title: (value.original_name || value.title),
                    image: value.poster_path,
                    origin_date: (value.first_air_date || value.release_date)
                  };
                });
              this.setState(state => ({
                dataResult: resultSearch
              }));
            }
          },
          error => {
            console.log(
              "ERROR: opsss something happen with the getForcastFromAPI request"
            );
          }
        );
    } else {
      this.setState(state => ({
        dataResult: [],
        textSearch: ""
      }));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.dataSearch.movieId) {
      this.setState(state => ({
        submit: false
      }));
      var formData = new FormData();
      formData.append('title', this.state.dataSearch.title);
      formData.append('movies_id', this.state.dataSearch.movieId);
      formData.append('img', this.state.dataSearch.image);
      formData.append('origin_date', this.state.dataSearch.origin_date);
      formData.append('act', 'add');
      const configFetch = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: formData
      };
      fetch(global.config.urlRequest + '/user/addmovies', configFetch)
        .then(response => response.json())
        .then(data => {
          if (data.act === 'true') {
            this.setState(state => ({
              moviesShareMassage: {
                text: 'Tahnks! The Movies Is Share!'
              },
              submit: true
            }));
            setTimeout(() => {
              this.setState(state => ({
                moviesShareMassage: {
                  text: ''
                }
              }));
            }, 1500);

          } else if (data.err === '302') {
            this.setState(state => ({
              moviesShareMassage: {text: 'You Shared this before', type: 'err'},
              submit: true
            }))
          }
        });
    } else {
      this.setState(state => ({
        moviesShareMassage: 'oh Bag, use refresh to apliction =]'
      }))
    }
    console.log('handleSubmit', this.state.dataSearch);

  };

  onChangeSearch = (event, value) => {
    if (value && value.title && value.movieId) {
      this.setState(state => ({
        dataSearch: value
      }));
    }
  };


  render() {
    return (
      <Col md={12}>
        <form onSubmit={this.handleSubmit} className={'justify-content-center row'}>
          <Col md={12} className={'text-center'} hidden={this.state.submit}>
            <Spinner animation="border" variant="success mt-3"/>
          </Col>
          <Col md={12} hidden={!this.state.submit}>
            <Row className={'justify-content-center mt-3'}>
              <Col md={4}>
                <h5><b>Share Movies with your Friends</b></h5>
              </Col>
              <Col md={12} hidden={!this.state.submit}>
                <Row className={"justify-content-center mb-3"}>
                  <Col xl={4} md={6} sm={12}>
                    <Autocomplete
                      onKeyUp={this.handleSearch}
                      options={this.state.dataResult}
                      getOptionLabel={option => option.title}
                      onChange={this.onChangeSearch}
                      style={{background: "white", borderRadius: "6px"}}
                      renderOption={option => {
                        return (<span>{(option.image ? <img width={'30px'} alt={'img'}
                                                            src={'https://image.tmdb.org/t/p/w220_and_h330_face' + option.image}/> : '')} {option.title}</span>)
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={'Serach '}
                          variant="outlined"
                        />
                      )}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <Row className={"justify-content-center mt-3 mb-3"}>
                  <Col md={3}>
                    <Button variant="success" type={"submit"} className={"w-100"}>
                      Success
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={12} hidden={this.state.moviesShareMassage.text === ''}>
                <Row className={"justify-content-center "}>
                  <Col md={3} className={ (this.state.moviesShareMassage.type === 'err' ? 'alert-warning' :  'alert-success') +' text-center alert' }>
                    {this.state.moviesShareMassage.text}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </form>
      </Col>
    );
  }
}

export default HomePage;
