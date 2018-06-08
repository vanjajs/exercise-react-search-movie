import React from 'react';


const movieInfo = (props) => {
  const style = {
    display: 'block'
  }
  const modalHeaderStyle = {
    backgroundColor: '#28a745',
    color: 'white'
  }
  return (
    <div className="modal show" id="exampleModal" style={style}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" style={modalHeaderStyle}>
            <h5 className="modal-title" id="exampleModalLabel">{props.data.Title}</h5>
            <button type="button" className="close" onClick={props.close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul>
              <li>Year: {props.data.Year}</li>
              <li>Rated: {props.data.Rated}</li>
              <li>Released: {props.data.Released}</li>
              <li>Runtime: {props.data.Runtime}</li>
              <li>Genre: {props.data.Genre}</li>
              <li>Director: {props.data.Director}</li>
              <li>Writer: {props.data.Writer}</li>
              <li>Actors: {props.data.Actors}</li>
            </ul>
            <p>{props.data.Plot}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.close}>Close</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default movieInfo;
