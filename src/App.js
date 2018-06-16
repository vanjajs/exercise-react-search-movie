import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { Nav, NavItem, NavLink, Button, Form, FormGroup, Input } from 'reactstrap';

import MovieList from './components/MovieList';
import MovieInfo from './components/MovieInfo';

const API_KEY = '7becba0';

class App extends Component {
  state = {
    movies: [],
    total: 0,
    showInfo: false,
    info: {}
  }

  searhMovie = (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + event.target.title.value)
    .then(response => {
      if (response.data.Error) {
        alert(response.data.Error);
        this.setState({
          movies: [],
          total: 0
        });
      }
      else {
        this.setState({
          movies: response.data.Search,
          total: response.data.totalResults
        });
      }
    })
  }

  showInfoHandler = (id) => {
    console.log(id);
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&i=' + id)
    .then(response => {
      console.log(response.data);
      this.setState({
        info: response.data,
        showInfo: true
      });
    })
  }

  closeInfoHandler = () => {
    this.setState({
      showInfo: false
    });
  }

  render() {
    let info = null;
    if (this.state.showInfo) {
      info = <MovieInfo data={this.state.info} close={this.closeInfoHandler} />
    }

    return (
      <div className="App">
        <Nav className="navbar navbar-light bg-light">
          <NavItem>
            Movie App
          </NavItem>
          <div>Results: {this.state.total}</div>
          <Form inline onSubmit={this.searhMovie}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="search" name="title" placeholder="Search" />
            </FormGroup>
            <Button color="success">Search</Button>
          </Form>
        </Nav>  

        <MovieList movies={this.state.movies} clicked={this.showInfoHandler} />

        {info}

      </div>
    );
  }
}

export default App;
