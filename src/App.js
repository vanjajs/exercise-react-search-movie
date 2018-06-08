import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

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
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Movies</a>
          <div>Results: {this.state.total}</div>
          <form className="form-inline" onSubmit={this.searhMovie}>
            <input className="form-control mr-sm-2" type="search" name="title" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>

        <MovieList movies={this.state.movies} clicked={this.showInfoHandler} />

        {info}

      </div>
    );
  }
}

export default App;
