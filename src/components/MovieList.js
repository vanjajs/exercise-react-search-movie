import React from 'react';

import Movie from './Movie';

const movieList = (props) => {
  let movies = null;
  if (props.movies) {
    movies = props.movies.map(movie => {
      return <Movie key={movie.imdbID} movie={movie} clicked={props.clicked.bind(this, movie.imdbID)} />
    });
  }

  return (
    <div className="card-columns">
      {movies}
    </div>
  )
}

export default movieList;
