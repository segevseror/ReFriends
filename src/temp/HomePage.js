import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from "@material-ui/lab/Autocomplete";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { dataResult: [], dataSearch: {} };
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
                .filter(function(value) {
                  if (!value.title) {
                    return false;
                  }
                  return true;
                })
                .map(function(value, key) {
                  return {
                    title: value.title,
                    movieId:value.id,
                    image: value.poster_path
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

  handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit',this.state.dataSearch);
  };

  handleSelect = (event, value) => {
   if(value && value.title && value.movieId){
     this.setState(state => ({
       dataSearch: value
     }));
   }
 };



  render() {
    return (
      <Col md={12}>
        <form onSubmit={this.handleSubmit}>
          <Col md={12}>
            <Row className={"justify-content-center mt-3 mb-3"}>
              <Col md={4}>
                <Autocomplete
                  onKeyUp={this.handleSearch}
                  options={this.state.dataResult}
                  getOptionLabel={option => option.title}
                  onChange={this.handleSelect }
                  style={{ background: "white", borderRadius: "6px" }}
                  renderOption={ option => {
                    return (<span>{(option.image ? <img width={'30px'} src={'https://image.tmdb.org/t/p/w220_and_h330_face'+option.image} /> : '')} {option.title}</span>)
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Search Movies"
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
        </form>
      </Col>
    );
  }
}
export default HomePage;
