import React from 'react';

const movie = (props) => (
  <div className="card">
    <img className="card-img-top" src={props.movie.Poster} alt={props.movie.Title} />
    <div className="card-body">
      <h5 className="card-title" style={{cursor:'pointer'}} onClick={props.clicked}>{props.movie.Title}</h5>
      <p className="card-text">{props.movie.Year}</p>
    </div>
  </div>
)

export default movie;
