import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { Nav, NavItem, Button, Form, FormGroup, Input } from 'reactstrap';

import MovieList from './components/MovieList';
import MovieInfo from './components/MovieInfo';
import Spinner from './components/Spinner';

const API_KEY = '7becba0';
const PER_PAGE = 10;

class App extends Component {
  state = {
    searchTerm: '',
    movies: [],
    total: 0,
    showInfo: false,
    info: {},
    page: 0,
    totalPages: 0,
    loading: false
  }

  searhMovie = (event) => {
    event.preventDefault();
    this.setState({ 
      searchTerm: event.target.title.value, 
      movies: [],
      total: 0,
      page: 0,
      totalPages: 0
    });
    this.loadMovies(event.target.title.value);
  }
  
  loadMovies = (searchTerm) => {
    this.setState({ loading: true });
    const page = this.state.page + 1;
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + searchTerm + '&page=' + page)
    .then(response => {
      if (response.data.Error) {
        alert(response.data.Error);
        this.setState({
          movies: [],
          total: 0,
          loading: false
        });
      }
      else {
        const totalPages = Math.floor(response.data.totalResults / PER_PAGE);
        this.setState(prevState => {
          return {
            movies: prevState.movies.concat(response.data.Search),
            total: response.data.totalResults,
            totalPages: totalPages,
            page: page,
            loading: false
          }
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

    let nextLink = null;
    if (this.state.page < this.state.totalPages) {
      nextLink = <Button color="primary" size="lg" block onClick={() => this.loadMovies(this.state.searchTerm)}>Load More</Button>
    }

    const spinner = this.state.loading? <Spinner /> : null;

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

        {spinner}

        {nextLink}

        {info}

      </div>
    );
  }
}

export default App;
